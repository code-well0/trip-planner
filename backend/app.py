# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from weather_predictor import WeatherPredictor  # now in the same folder

app = Flask(__name__)
CORS(app)

def weather_summary(prediction):
    """
    Create a user-friendly summary string from the prediction dict.
    """
    condition = prediction.get("condition", "Unavailable")
    temp_max = prediction.get("temp_max", "N/A")
    temp_min = prediction.get("temp_min", "N/A")
    if temp_max != "N/A":
        return f"{condition}, Max: {temp_max:.1f}°C, Min: {temp_min:.1f}°C"
    else:
        return "Weather info unavailable"

@app.route("/api/predict_weather", methods=["GET"])
def predict_weather():
    city = request.args.get("city")
    date = request.args.get("date")
    
    if not city or not date:
        return jsonify({"error": "Please provide city and date"}), 400

    # CSV path relative to backend folder
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', f"{city}_weather.csv")
    csv_path = os.path.abspath(csv_path)

    if not os.path.exists(csv_path):
        return jsonify({"error": f"Weather data for {city} not found"}), 404

    try:
        predictor = WeatherPredictor(csv_path)
        raw_prediction = predictor.predict(date)  # original dict from predictor

        # Ensure keys match frontend expectations
        prediction = {
            "condition": raw_prediction.get("weather", "Unavailable"),
            "temp_max": raw_prediction.get("temp_max", "N/A"),
            "temp_min": raw_prediction.get("temp_min", "N/A")
        }

        friendly = weather_summary(prediction)

        return jsonify({
            "city": city,
            "date": date,
            "weather_summary": friendly,
            "details": prediction
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def index():
    return "Weather API is running!"

if __name__ == "__main__":
    app.run(debug=True)
