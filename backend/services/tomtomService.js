import axios from "axios";

const TOMTOM_API_KEY = "TOMTOM_API_KEY";

// Reverse geocode lat/lon to human-readable name
export const reverseGeocode = async (lat, lon) => {
  try {
    const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.JSON?key=${TOMTOM_API_KEY}&language=en-US`;
    const response = await axios.get(url);

    const address = response.data?.addresses?.[0]?.address;

    if (!address) return `${lat.toFixed(5)},${lon.toFixed(5)}`;

    // Combine components to make human-readable
    const nameParts = [
      address.streetNumber,
      address.streetName,
      address.municipality,
      address.municipalitySubdivision,
      address.countrySubdivision,
      address.country
    ].filter(Boolean);

    return nameParts.join(", ");
  } catch (error) {
    console.error("❌ TomTom reverse geocoding error:", error.response?.data || error.message);
    return `${lat.toFixed(5)},${lon.toFixed(5)}`; // fallback to coordinates
  }
};
