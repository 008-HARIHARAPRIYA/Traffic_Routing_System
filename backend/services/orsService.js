import axios from "axios";
import { reverseGeocode } from "./tomtomService.js"; // import TomTom service
import { getWeather } from "./weatherService.js";
const ORS_API_KEY = process.env.ORS_KEY;

// 1️⃣ Convert location name to lat/lon
export const getCoordinates = async (placeName) => {
  try {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(placeName)}&size=1`;
    const response = await axios.get(url);
    const result = response.data.features?.[0];
    if (!result) return null;

    return {
      lat: result.geometry.coordinates[1],
      lon: result.geometry.coordinates[0],
    };
  } catch (error) {
    console.error("❌ Geocoding error:", error.response?.data || error.message);
    return null;
  }
};

// 2️⃣ Reverse geocode coordinates to get human-readable name
export const getPlaceName = async (lat, lon) => {
  try {
    const url = `https://api.openrouteservice.org/geocode/reverse`;
    const response = await axios.get(url, {
      params: {
        api_key: ORS_API_KEY,
        point_lat: lat,
        point_lon: lon,
      },
    });

    const name = response.data.features?.[0]?.properties?.label;
    return name || `${lat.toFixed(5)},${lon.toFixed(5)}`;
  } catch (error) {
    console.error("❌ Reverse geocode error:", error.response?.data || error.message);
    return `${lat.toFixed(5)},${lon.toFixed(5)}`;
  }
};



export const fetchORSRoutes = async (startCoords, endCoords) => {
  try {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    const body = {
      coordinates: [
        [startCoords.lon, startCoords.lat],
        [endCoords.lon, endCoords.lat],
      ],
      alternative_routes: {
        target_count: 3,
        share_factor: 0.6,
      },
    };

    const response = await axios.post(url, body, {
      headers: { Authorization: ORS_API_KEY, "Content-Type": "application/json" },
    });

    if (!response.data?.features?.length) return [];

    const routes = [];

    for (let index = 0; index < response.data.features.length; index++) {
      const feature = response.data.features[index];
      const coords = feature.geometry.coordinates;

      const waypoints = [];
      const weatherList = [];

      // Sample ~10–15 points for efficiency
      for (let i = 0; i < coords.length; i += Math.floor(coords.length / 10)) {
        const [lon, lat] = coords[i];
        const name = await reverseGeocode(lat, lon);
        waypoints.push(name);

        const weather = await getWeather(lat, lon);
        if (weather) weatherList.push(weather);
      }

      // Aggregate weather
      let avgTemp = 0, avgHumidity = 0;
      const weatherCount = {};

      weatherList.forEach(w => {
        avgTemp += w.temp;
        avgHumidity += w.humidity;
        weatherCount[w.description] = (weatherCount[w.description] || 0) + 1;
      });

      avgTemp = (avgTemp / weatherList.length).toFixed(1);
      avgHumidity = (avgHumidity / weatherList.length).toFixed(0);

      // Most frequent weather description
      const mostCommonWeather = Object.entries(weatherCount).sort((a, b) => b[1] - a[1])[0][0];

      routes.push({
        routeNumber: index + 1,
        distance: (feature.properties.summary.distance / 1000).toFixed(2) + " km",
        duration: (feature.properties.summary.duration / 60).toFixed(2) + " min",
        waypoints,
        weather: {
          avgTemp,
          avgHumidity,
          condition: mostCommonWeather
        },
        trafficDelay: "0 min",
      });
    }

    return routes;
  } catch (error) {
    console.error("❌ ORS Route fetch error:", error.response?.data || error.message);
    return [];
  }
};
