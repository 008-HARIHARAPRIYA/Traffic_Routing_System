import { saveRoute, fetchAllRoutes } from "../services/routeService.js";
import { getCoordinates, fetchORSRoutes } from "../services/orsService.js";

// Create and store a new route
export const createRoute = async (req, res) => {
  try {
    const { source, destination, travelMode, timeConstraint, pollutionPreference } = req.body;

    // 1️⃣ Convert to coordinates
    const startCoords = await getCoordinates(source);
    const endCoords = await getCoordinates(destination);

    if (!startCoords || !endCoords) {
      return res.status(400).json({ message: "Could not fetch coordinates for given locations." });
    }

    // 2️⃣ Fetch routes from ORS (human-readable waypoints handled inside fetchORSRoutes)
    const possibleRoutes = await fetchORSRoutes(startCoords, endCoords);

    // 3️⃣ Save in DB
    const newRoute = await saveRoute({
      source,
      destination,
      travelMode,
      timeConstraint,
      pollutionPreference,
      optimizedRoute: possibleRoutes[0]?.distance || "No route found",
    });

    // 4️⃣ Respond
    res.status(201).json({
      message: "✅ Route saved successfully!",
      coordinates: { startCoords, endCoords },
      possibleRoutes,
      data: newRoute,
    });
  } catch (error) {
    console.error("Error saving route:", error);
    res.status(500).json({ message: "Failed to save route", error });
  }
};

// Get all saved routes
export const getAllRoutes = async (req, res) => {
  try {
    const routes = await fetchAllRoutes();
    res.status(200).json(routes);
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ message: "Failed to fetch routes", error });
  }
};
