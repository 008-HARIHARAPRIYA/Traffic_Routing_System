import axios from "axios";

/**
 * Fetch multiple routes from OSRM
 * @param {string} source - "lon,lat" e.g., "80.2707,13.0827"
 * @param {string} destination - "lon,lat" e.g., "78.1198,9.9252"
 * @param {number} maxRoutes - number of alternative routes
 */
export const getMultipleRoutesFromOSRM = async (source, destination, maxRoutes = 3) => {
  try {
    const url = `http://router.project-osrm.org/route/v1/driving/${source};${destination}`;
    
    const response = await axios.get(url, {
      params: {
        alternatives: maxRoutes,  // number of alternative routes
        overview: "false",        // we don't need geometry for now
        steps: false
      }
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      console.error("No routes returned by OSRM");
      return null;
    }

    const routes = response.data.routes.map(route => ({
      distance: route.distance,           // meters
      travelTime: route.duration,         // seconds
      dynamicWeight: route.duration       // initially same as duration, you can modify later
    }));

    console.log("Fetched OSRM routes:", routes);
    return routes;

  } catch (error) {
    console.error("Error fetching routes from OSRM:", error.message);
    return null;
  }
};
