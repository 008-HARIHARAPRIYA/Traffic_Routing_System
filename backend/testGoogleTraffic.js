import axios from "axios";

const GOOGLE_API_KEY = ""; // replace this

const origin = { lat: 13.08268, lng: 80.27072 };       // Chennai Central
const destination = { lat: 13.0418, lng: 80.2785 };    // Marina Beach

const getTrafficDelay = async (origin, destination) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json`;

    const params = {
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
      mode: "driving",
      departure_time: "now",
      key: GOOGLE_API_KEY,
    };

    const response = await axios.get(url, { params });
    const route = response.data.routes?.[0];

    if (!route) {
      console.log("❌ No route found. Check if billing is enabled and API key is correct.");
      console.log(response.data);
      return;
    }

    const leg = route.legs[0];
    const normalDuration = leg.duration.text;
    const trafficDuration = leg.duration_in_traffic?.text || "Not available";

    console.log("🚗 Route Summary:");
    console.log(`From: ${leg.start_address}`);
    console.log(`To: ${leg.end_address}`);
    console.log(`🕒 Normal Duration: ${normalDuration}`);
    console.log(`🚦 Duration (with Traffic): ${trafficDuration}`);

    if (leg.duration_in_traffic) {
      const delay =
        (leg.duration_in_traffic.value - leg.duration.value) / 60;
      console.log(`📊 Traffic Delay: ${delay.toFixed(1)} minutes`);
    } else {
      console.log("ℹ️ Live traffic data not available for this route.");
    }
  } catch (error) {
    console.error("❌ Error fetching traffic data:", error.response?.data || error.message);
  }
};

getTrafficDelay(origin, destination);
