# Adaptive Traffic Routing

## Description

This project provides an intelligent routing solution that combines real-time data from various sources to offer optimized routes. It considers factors such as travel time, weather conditions, and pollution levels to help users find efficient, safer, and greener travel options. The system integrates multiple mapping and weather APIs to fetch comprehensive route information and environmental data, allowing for personalized route suggestions.

## Features

*   **Real-time Route Updates**: Fetches and presents multiple route alternatives with current data.
*   **Eco-Friendly Options**: Suggests routes considering pollution levels.
*   **AI-Powered Suggestions**: Implies intelligent processing to provide optimized routes based on various preferences.
*   **Multiple Route Choices**: Displays several possible routes with their respective details.
*   **Weather & Pollution Aware**: Integrates weather and air quality information into route calculations.
*   **Geocoding**: Converts location names to geographical coordinates.
*   **Reverse Geocoding**: Converts geographical coordinates back to human-readable place names.
*   **Traffic Data Integration**: Incorporates live traffic conditions to estimate travel duration.
*   **Route Saving**: Allows saving of optimized route details.
*   **Interactive Frontend**: A web interface for users to input route preferences and view results.
*   **Chatbot**: A basic chatbot interface to answer questions related to optimal routing.

## Technology Stack

### Programming Languages

*   JavaScript

### Frontend

*   React
*   HTML
*   CSS

### Backend

*   Node.js
*   Express.js

### Databases

*   MongoDB (managed with Mongoose)

### APIs Integrated

*   OpenRouteService (ORS) Geocoding API
*   OpenRouteService (ORS) Directions API
*   GraphHopper Directions API
*   Google Maps Directions API
*   Google Maps Traffic API
*   OpenWeatherMap API
*   TomTom Reverse Geocoding API
*   OpenStreetMap (for Leaflet tile layers)
*   OSRM (Open Source Routing Machine)

### Libraries / Frameworks

*   **Backend**:
    *   `express`: Web framework for Node.js.
    *   `dotenv`: Loads environment variables from a `.env` file.
    *   `cors`: Provides a Connect/Express middleware that can be used to enable CORS with various options.
    *   `mongoose`: MongoDB object modeling for Node.js.
    *   `axios`: Promise-based HTTP client for the browser and Node.js.
*   **Frontend**:
    *   `react`: JavaScript library for building user interfaces.
    *   `react-router-dom`: Declarative routing for React.
    *   `axios`: Promise-based HTTP client.
    *   `leaflet`: JavaScript library for interactive maps.
    *   `react-leaflet`: React components for Leaflet maps.
    *   `web-vitals`: For measuring web vitals performance.

### Development Tools

*   `create-react-app` (implied for frontend setup)
*   `jest` (`@testing-library/react`, `@testing-library/jest-dom`) for testing.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

*   **`backend/`**: Contains the Node.js Express server-side application.
    *   **`config/`**:
        *   `db.js`: Handles the connection to MongoDB.
    *   **`controllers/`**:
        *   `routeController.js`: Manages the logic for handling route-related requests.
    *   **`models/`**:
        *   `Route.js`: Defines the Mongoose schema and model for storing route information.
    *   **`routes/`**:
        *   `routeRoutes.js`: Defines the API endpoints for route creation and retrieval.
    *   **`services/`**: Contains modules for integrating with external APIs and performing calculations.
        *   `googleMapsService.js`: Interacts with Google Maps Directions API.
        *   `googleTrafficService.js`: Fetches live traffic data from Google Maps.
        *   `graphhopperApi.js`: Interacts with GraphHopper API.
        *   `orsService.js`: Manages interactions with OpenRouteService for geocoding and directions, and integrates weather and reverse geocoding.
        *   `osrmApi.js`: Fetches routes from OSRM.
        *   `routeService.js`: Provides functions for saving and fetching routes from the database.
        *   `tomtomService.js`: Interacts with TomTom API for reverse geocoding.
        *   `weatherApi.js`: Fetches weather and AQI data from OpenWeatherMap.
        *   `weatherService.js`: Fetches weather data from OpenWeatherMap.
        *   `weightCalculator.js`: Contains logic to calculate dynamic route weights based on various factors.
    *   Standalone test files: `geocodingtest.js`, `hybrid.js`, `testGH.js`, `testgmap.js`, `testGoogleTraffic.js`, `testORS.js`, `testORSnew.js`, `weatherTest.js` are present for testing individual API integrations.
    *   `server.js`: The main entry point for the backend server.
*   **`frontend/`**: Contains the React client-side application.
    *   **`public/`**: Public assets and the `index.html` template.
    *   **`src/`**: Source code for the React application.
        *   **`components/`**: Reusable React components.
            *   `ChatbotPage.js`: Displays a chatbot interface.
            *   `HomePage.js`: Displays recommended routes.
            *   `InputForm.js`: A form for route input and preferences.
            *   `Landing.js`: A simple landing component.
            *   `Navbar.js`: Navigation bar component.
            *   `OptiRouteForm.js`: Main form for finding optimal routes.
            *   `RouteList.js`: Displays a list of route options.
            *   `RouteMap.js`: Displays routes on a Leaflet map.
        *   `App.js`: The main application component, defining routes.
        *   `App.css`: Global CSS for the application.
        *   `index.js`: Entry point for the React application.
        *   `index.css`: Global CSS, including Leaflet styles.
        *   `reportWebVitals.js`: For measuring application performance.
        *   `App.test.js`, `setupTests.js`: Frontend testing files.

## Setup and Installation

### Prerequisites

*   Node.js (LTS recommended)
*   npm or yarn

### Backend Setup

1.  **Navigate to the backend directory**: