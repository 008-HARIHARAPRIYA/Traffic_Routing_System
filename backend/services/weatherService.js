import axios from "axios";

// 🔑 Your OpenWeatherMap API Key
const API_KEY = "OPENWEATHER_KEY";

// Get current weather by lat/lon
export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;
    return {
      location: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error("❌ Weather fetch error:", error.response?.data || error.message);
    return null;
  }
};
