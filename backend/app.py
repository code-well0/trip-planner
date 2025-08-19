# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
import joblib
import re
import logging

app = Flask(__name__)
CORS(app)

# Logging
logging.basicConfig(level=logging.INFO)

# Folder where all models are stored
MODEL_FOLDER = os.path.join(os.path.dirname(__file__), "..", "models")
MODEL_FOLDER = os.path.abspath(MODEL_FOLDER)

def sanitize_feature_name(feature: str) -> str:
    """Sanitize feature name for filename: remove special chars, collapse multiple underscores."""
    feature = re.sub(r'[^A-Za-z0-9]+', '_', feature)  # non-alphanumeric → _
    feature = re.sub(r'_+', '_', feature)             # collapse multiple underscores
    return feature.strip('_')

def load_model(city, feature):
    """Load Prophet model pickle for a city & feature."""
    safe_feat = sanitize_feature_name(feature)
    filename = f"{city}_{safe_feat}_prophet.pkl"
    filepath = os.path.join(MODEL_FOLDER, filename)
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Model {filename} not found.")
    return joblib.load(filepath)

def classify_weather(temp_max, temp_min, precipitation, windspeed=0):
    """Simple human-readable weather classification."""
    if precipitation is None:
        return "Data unavailable"
    if precipitation > 5:
        return "Rainy"
    elif precipitation > 0:
        return "Slight Rain"
    elif windspeed > 20:
        return "Windy"
    elif temp_max is not None and temp_max < 15:
        return "Cold"
    else:
        return "Clear"

def forecast_city(city, date):
    """Forecast max/min temperature, precipitation, and classify condition."""
    features = [
        "temperature_2m_max (°C)",
        "temperature_2m_min (°C)",
        "precipitation_sum (mm)"
    ]

    predictions = {}
    forecast_date = pd.to_datetime(date)

    for feat in features:
        try:
            model = load_model(city, feat)
            future = pd.DataFrame({"ds": [forecast_date]})
            forecast = model.predict(future)
            yhat = forecast["yhat"].iloc[0]

            if "temperature" in feat:
                yhat = round(float(yhat), 1)
            elif "precipitation" in feat:
                yhat = round(float(yhat), 2)

            predictions[feat] = yhat
        except Exception as e:
            logging.warning(f"Prediction failed for {feat} in {city}: {e}")
            predictions[feat] = None

    temp_max = predictions.get("temperature_2m_max (°C)")
    temp_min = predictions.get("temperature_2m_min (°C)")
    precipitation = predictions.get("precipitation_sum (mm)", 0)

    condition = classify_weather(temp_max, temp_min, precipitation)

    return {
        "temp_max": temp_max,
        "temp_min": temp_min,
        "condition": condition
    }

@app.route("/api/forecast", methods=["GET"])
def forecast():
    city = request.args.get("city")
    date = request.args.get("date")

    if not city or not date:
        return jsonify({"error": "Please provide both city and date"}), 400

    try:
        forecast_data = forecast_city(city, date)
        return jsonify({
            "city": city,
            "date": date,
            "forecast": forecast_data
        })
    except Exception as e:
        logging.error(f"Forecast failed: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/")
def index():
    return "Weather API is running!"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Heroku/Render port if available
    debug_mode = os.environ.get("FLASK_DEBUG", "False") == "True"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
