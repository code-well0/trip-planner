# weather_predictor.py
import pandas as pd
from prophet import Prophet

class WeatherPredictor:
    def __init__(self, city_csv_path):
        self.city_csv_path = city_csv_path
        self.model_max = None
        self.model_min = None
        self.df_max = None
        self.df_min = None
        self.df_hist = None 

    def load_and_preprocess(self):
        df = pd.read_csv(self.city_csv_path)
        df.columns = df.columns.str.strip()
        df['time'] = pd.to_datetime(df['time'])
        self.df_hist = df.copy()

       
        self.df_max = df[['time','temperature_2m_max (°C)']].rename(columns={'time':'ds','temperature_2m_max (°C)':'y'})
        self.df_min = df[['time','temperature_2m_min (°C)']].rename(columns={'time':'ds','temperature_2m_min (°C)':'y'})

    def train_models(self):
        if self.df_max is None or self.df_min is None:
            self.load_and_preprocess()

        self.model_max = Prophet(yearly_seasonality=True, daily_seasonality=False)
        self.model_max.fit(self.df_max)

        self.model_min = Prophet(yearly_seasonality=True, daily_seasonality=False)
        self.model_min.fit(self.df_min)

    def predict(self, future_date_str):
        if self.model_max is None or self.model_min is None:
            self.train_models()

        future = pd.DataFrame({'ds':[future_date_str]})
        forecast_max = self.model_max.predict(future)
        forecast_min = self.model_min.predict(future)

        temp_max = round(forecast_max['yhat'].values[0],1)
        temp_min = round(forecast_min['yhat'].values[0],1)

        # Approximate day-of-year averages for precipitation and wind
        day_of_year = pd.to_datetime(future_date_str).dayofyear
        df_hist = self.df_hist.copy()
        df_hist['doy'] = df_hist['time'].dt.dayofyear

        avg_precip = df_hist[df_hist['doy']==day_of_year]['precipitation_sum (mm)'].mean()
        avg_wind = df_hist[df_hist['doy']==day_of_year]['windspeed_10m_max (km/h)'].mean()

        # Determine weather label
        if avg_precip > 5:
            weather_label = "Rainy"
        elif avg_precip > 0:
            weather_label = "Slight rain"
        elif avg_wind > 20:
            weather_label = "Windy"
        elif temp_max < 15:
            weather_label = "Cold"
        else:
            weather_label = "Clear"

        return {
            "date": future_date_str,
            "weather": weather_label,
            "temp_max": temp_max,
            "temp_min": temp_min
        }

# Example usage
if __name__ == "__main__":
    city = "Goa"
    csv_path = f"src/data/{city}_weather.csv"
    predictor = WeatherPredictor(csv_path)

    date_to_predict = "2025-10-30"
    prediction = predictor.predict(date_to_predict)

    print(f"On {prediction['date']} in {city}: {prediction['weather']}, "
          f"Max: {prediction['temp_max']}°C, Min: {prediction['temp_min']}°C")
