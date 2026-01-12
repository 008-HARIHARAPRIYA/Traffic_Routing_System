import axios from "axios";

const ORS_API_KEY = "ORS_KEY";

const getCoordinates = async (placeName) => {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(placeName)}`;

  try {
    const response = await axios.get(url);
    const feature = response.data.features[0];
    if (!feature) throw new Error("Location not found");

    const [lon, lat] = feature.geometry.coordinates;
    console.log(`${placeName}: Latitude=${lat}, Longitude=${lon}`);
    return { lat, lon };
  } catch (error) {
    console.error("Error getting coordinates:", error.message);
  }
};

// Example usage:
getCoordinates("Porur, Chennai");
getCoordinates("Guindy, Chennai");
