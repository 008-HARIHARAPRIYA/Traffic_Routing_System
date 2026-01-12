import axios from "axios";

export const getWeatherAQI = async (lat, lon) => {
  try {
    // Weather data
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_KEY,
          units: "metric"
        }
      }
    );

    // Air quality data
    const aqiRes = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution`, {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_KEY
        }
      }
    );

    return {
      weather: weatherRes.data,
      aqi: aqiRes.data.list[0].main.aqi // 1=good, 5=very poor
    };
  } catch (error) {
    console.error("Error fetching weather/AQI:", error.message);
    return null;
  }
};
