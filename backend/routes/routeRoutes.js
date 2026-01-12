import express from "express";
import { createRoute, getAllRoutes } from "../controllers/routeController.js";

const router = express.Router();

// Save a new route
router.post("/add", createRoute);

// Get all saved routes
router.get("/all", getAllRoutes);

export default router;
