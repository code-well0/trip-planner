import os
import pandas as pd
from datetime import datetime, timedelta
import requests

# Create data folder if it doesn't exist
os.makedirs("src/data", exist_ok=True)

# Cities with latitude and longitude
cities = {
    "Agra": (27.1767, 78.0081),
    "Jaipur": (26.9124, 75.7873),
    "Goa": (15.2993, 74.1240),
    "Varanasi": (25.3176, 82.9739),
    "Darjeeling": (27.0360, 88.2627),
    "Jaisalmer": (26.9157, 70.9083)
}

# Date range: last 360 days (~1 year)
end_date = datetime.today()
start_date = end_date - timedelta(days=360)
start_str = start_date.strftime('%Y-%m-%d')
end_str = end_date.strftime('%Y-%m-%d')

for city_name, (lat, lon) in cities.items():
    print(f"Fetching data for {city_name}...")

    # Open-Meteo API URL (daily data, CSV format)
    url = (
        f"https://archive-api.open-meteo.com/v1/archive?"
        f"latitude={lat}&longitude={lon}"
        f"&start_date={start_str}&end_date={end_str}"
        f"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max"
        f"&timezone=Asia/Kolkata&format=csv"
    )

    response = requests.get(url)

    if response.status_code == 200:
        # Save CSV directly
        with open(f"src/data/{city_name}_weather.csv", "wb") as f:
            f.write(response.content)
        print(f"Saved {city_name}_weather.csv")
    else:
        print(f"Failed to fetch data for {city_name}: {response.status_code}")
