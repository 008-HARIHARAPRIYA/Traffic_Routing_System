import axios from "axios";

// 🔑 Replace with your OpenWeatherMap API key
const API_KEY = "OPENWEATHER_KEY";

// Function to get current weather for given lat, lon
async function getWeather(lat, lon) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric" // Celsius
        },
      }
    );

    const data = response.data;

    console.log("Location:", data.name);
    console.log("Temperature:", data.main.temp + "°C");
    console.log("Feels Like:", data.main.feels_like + "°C");
    console.log("Humidity:", data.main.humidity + "%");
    console.log("Weather:", data.weather[0].description);
    console.log("Wind Speed:", data.wind.speed + " m/s");
  } catch (err) {
    // Detailed error logging
    if (err.response) {
      // Server responded with a status code outside 2xx
      console.error("Status Code:", err.response.status);
      console.error("Response Data:", err.response.data);
      console.error("Headers:", err.response.headers);
    } else if (err.request) {
      // Request made but no response received
      console.error("No response received:", err.request);
    } else {
      // Something else happened
      console.error("Error:", err.message);
    }
    console.error("Config:", err.config);
  }
}

// ✅ Example: Chennai (13.0827, 80.2707)
getWeather(13.0827, 80.2707);
