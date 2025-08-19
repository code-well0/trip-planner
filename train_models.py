import pandas as pd
from prophet import Prophet
import joblib
import os
import re

# Make sure models/ folder exists
os.makedirs("models", exist_ok=True)

def sanitize_column_name(name):
    """Sanitize column name for filenames: remove special chars, collapse multiple underscores."""
    name = re.sub(r'[^A-Za-z0-9]+', '_', name)  # replace non-alphanumeric with _
    name = re.sub(r'_+', '_', name)             # collapse multiple underscores
    return name.strip('_')                       # remove leading/trailing underscores

def train_regressor(city, column):
    file_path = f"src/data/{city}_weather.csv"
    df = pd.read_csv(file_path)

    # Rename columns for Prophet
    df = df.rename(columns={"time": "ds", column: "y"})
    df["ds"] = pd.to_datetime(df["ds"])

    model = Prophet()
    model.fit(df[["ds", "y"]])

    # Sanitize filename
    safe_col = sanitize_column_name(column)
    model_path = f"models/{city}_{safe_col}_prophet.pkl"
    joblib.dump(model, model_path)
    print(f"✅ Trained {column} model for {city}, saved at {model_path}")


if __name__ == "__main__":
    cities = ["Agra", "Jaipur", "Goa", "Varanasi", "Darjeeling", "Jaisalmer", 
              "Udaipur", "Rishikesh", "Khajuraho", "Munnar", "Amritsar", "Hampi"]

    # Exclude weathercode from training
    columns = [
        "temperature_2m_max (°C)",
        "temperature_2m_min (°C)",
        "precipitation_sum (mm)",
        "windspeed_10m_max (km/h)"
    ]

    for city in cities:
        for col in columns:
            try:
                train_regressor(city, col)
            except Exception as e:
                print(f"❌ Failed for {city} - {col}: {e}")
