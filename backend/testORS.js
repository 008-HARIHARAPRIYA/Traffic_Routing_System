import axios from "axios";

const ORS_API_KEY = "ORS_KEY";

const fetchORSRoutes = async (start, end) => {
  try {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    // ORS expects coordinates in [lon, lat] format
    const body = {
      coordinates: [
        start.split(",").reverse().map(Number),  // [lon, lat]
        end.split(",").reverse().map(Number)
      ],
      alternative_routes: {
        target_count: 3,    // number of alternative routes
        share_factor: 0.6   // maximum overlap with main route
      }
    };

    const response = await axios.post(url, body, {
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!response.data || !response.data.features) {
      console.error("No routes returned by ORS");
      return;
    }

    // ORS returns routes in GeoJSON features array
    const routes = response.data.features.map((feature, index) => ({
      routeNumber: index + 1,
      distance: feature.properties.summary.distance,   // meters
      travelTime: feature.properties.summary.duration  // seconds
    }));

    console.log("Fetched ORS routes:", routes);

  } catch (error) {
    console.error("Error fetching ORS routes:", error.response?.data || error.message);
  }
};

// Test with Chennai -> Madurai
const source = "13.038063,80.159607";
const destination = "13.01023,80.215652";

fetchORSRoutes(source, destination);
