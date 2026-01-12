import axios from "axios";
import Route from "../models/Route.js";

// Replace with your TomTom API key
const TOMTOM_API_KEY = "TOMTOM_API_KEY";

/**
 * Get route from TomTom API including traffic info
 * @param {Object} routeData - Must contain start and end coordinates
 * @param {Array} routeData.start - [lat, lon]
 * @param {Array} routeData.end - [lat, lon]
 */
export const getTomTomRoute = async (routeData) => {
  try {
    const { start, end } = routeData;

    // TomTom Routing API URL
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${start[0]},${start[1]}:${end[0]},${end[1]}/json`;

    const response = await axios.get(url, {
      params: {
        key: TOMTOM_API_KEY,
        traffic: true, // enables live traffic data
        routeType: "fastest", // can be fastest, shortest, eco, etc.
        travelMode: "car",
      },
    });

    // Extract route summary and traffic info
    const routeInfo = response.data.routes[0];
    const routeSummary = {
      distance: routeInfo.summary.lengthInMeters,
      travelTime: routeInfo.summary.travelTimeInSeconds,
      trafficDelay: routeInfo.summary.trafficDelayInSeconds,
      points: routeInfo.legs[0].points, // coordinates along the route
    };

    return routeSummary;
  } catch (error) {
    console.error("Error fetching TomTom route:", error.response?.data || error.message);
    throw error;
  }
};

// Save route to MongoDB
export const saveRoute = async (routeData) => {
  const newRoute = new Route(routeData);
  return await newRoute.save();
};

// Fetch all saved routes
export const fetchAllRoutes = async () => {
  return await Route.find();
};
