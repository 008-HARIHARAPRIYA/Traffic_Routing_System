# Adaptive Traffic Routing

## Description

This project provides smart and safe traffic routing solutions by combining real-time traffic, weather, and pollution data. Its goal is to help commuters reach their destination faster, safer, and greener through AI-powered suggestions and multiple route choices. The system allows users to input source and destination locations, apply preferences, and view optimized routes with relevant environmental information.

## Features

*   **Real-time Route Updates**: Provides dynamic route information.
*   **Eco-Friendly Options**: Suggests routes with lower pollution levels.
*   **AI-Powered Suggestions**: Offers intelligent route recommendations.
*   **Multiple Route Choices**: Presents several alternative routes.
*   **Weather & Pollution Aware**: Integrates current weather and air quality index (AQI) data into route calculations.
*   **Geocoding**: Converts place names to geographical coordinates.
*   **Reverse Geocoding**: Converts coordinates back to human-readable place names (waypoints).
*   **Traffic Data Integration**: Fetches and displays traffic delay information.
*   **Route Saving**: Allows saving of calculated routes to a database.
*   **Interactive Map Display**: Visualizes routes on a map using Leaflet.
*   **Chatbot Interface**: A simulated chatbot for interacting with route suggestions and preferences.

## Technology Stack

*   **Programming Languages**:
    *   JavaScript (Node.js, React)
*   **Frontend**:
    *   React.js
    *   React Router DOM
    *   CSS
    *   Leaflet.js (for maps)
    *   React-Leaflet
    *   Axios (for HTTP requests)
*   **Backend**:
    *   Node.js
    *   Express.js
    *   Mongoose (ODM for MongoDB)
    *   Dotenv (for environment variables)
    *   CORS (for cross-origin resource sharing)
    *   Axios (for HTTP requests to external APIs)
*   **Databases**:
    *   MongoDB
*   **APIs Integrated**:
    *   OpenRouteService (ORS) Geocoding API
    *   OpenRouteService (ORS) Directions API
    *   GraphHopper Directions API
    *   Google Maps Directions API
    *   OpenWeatherMap API (for weather and AQI)
    *   TomTom API (for routing and reverse geocoding)
    *   OSRM (Open Source Routing Machine)
*   **Development Tools**:
    *   npm / yarn (package management)
    *   Jest (for testing)
    *   `create-react-app` (frontend setup)

## Project Structure

The project is divided into `backend` and `frontend` directories.