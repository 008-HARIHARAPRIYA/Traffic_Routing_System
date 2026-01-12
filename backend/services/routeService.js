import Route from "../models/Route.js";

// Save route to MongoDB
export const saveRoute = async (routeData) => {
  const newRoute = new Route(routeData);
  return await newRoute.save();
};

// Fetch all saved routes
export const fetchAllRoutes = async () => {
  return await Route.find();
};
