import axios from "axios";

export const getRouteFromGraphHopper = async (source, destination) => {
  try {
    const GH_API_KEY = "GRAPHHOPPER_KEY";

    const src = source.trim();
    const dest = destination.trim();

    console.log("Source:", src, "Destination:", dest);

    const url = "https://graphhopper.com/api/1/route";

    // Correct way: pass each point as its own param
    const response = await axios.get(url, {
      params: {
        vehicle: "car",
        locale: "en",
        calc_points: false,
        elevation: false,
        key: GH_API_KEY,
        "point": [src, dest] // Axios automatically sends multiple query params for array
      },
      paramsSerializer: params => {
        // Force multiple point=... parameters
        return Object.entries(params)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map(v => `${key}=${encodeURIComponent(v)}`).join("&");
            }
            return `${key}=${encodeURIComponent(value)}`;
          })
          .join("&");
      }
    });

    const route = response.data.paths[0];

    console.log("Raw route response:", route);

    return {
      distance: route.distance,       // meters
      travelTime: route.time / 1000   // seconds
    };
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("GraphHopper Error:", error.response.data);
    } else {
      console.error("Error fetching route from GraphHopper:", error.message);
    }
    return null;
  }
};
