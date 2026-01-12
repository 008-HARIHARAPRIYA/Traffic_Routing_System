import axios from "axios";

const GOOGLE_API_KEY = "GOOGLE_API_KEY"; // Replace this

// Fetch live traffic data between two coordinates
export const getTrafficData = async (startCoords, endCoords) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.lat},${startCoords.lon}&destination=${endCoords.lat},${endCoords.lon}&departure_time=now&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url);
    const route = response.data.routes?.[0];

    if (!route) return { trafficDelay: "Unknown", trafficDuration: "Unknown" };

    const leg = route.legs[0];
    const normalDuration = leg.duration.text; // e.g. "25 mins"
    const trafficDuration = leg.duration_in_traffic?.text || normalDuration;

    // Calculate delay
    const delayMinutes =
      leg.duration_in_traffic && leg.duration
        ? (
            (leg.duration_in_traffic.value - leg.duration.value) /
            60
          ).toFixed(1)
        : "0";

    return {
      trafficDelay: `${delayMinutes} min`,
      trafficDuration,
      normalDuration,
    };
  } catch (error) {
    console.error("❌ Google Traffic fetch error:", error.response?.data || error.message);
    return { trafficDelay: "Error", trafficDuration: "Error" };
  }
};
