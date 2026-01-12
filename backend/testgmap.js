import axios from "axios";

// Replace with your actual API key
const apiKey ="GOOGLE_API_KEY";

// Sample source and destination
const source = "Chennai";
const destination = "Bangalore";

const testGoogleMapsAPI = async () => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin: source,
          destination: destination,
          alternatives: true,
          key: apiKey,
        },
      }
    );

    if (response.data.status === "OK") {
      console.log("✅ API Key is working!");
      console.log(`Found ${response.data.routes.length} route(s).`);
      console.log("First route summary:", response.data.routes[0]?.summary);
    } else {
      console.log("⚠️ API responded with status:", response.data.status);
      console.log("Details:", response.data.error_message || "No error message");
    }
  } catch (error) {
    console.error("❌ Error testing Google Maps API:", error.message);
  }
};

testGoogleMapsAPI();