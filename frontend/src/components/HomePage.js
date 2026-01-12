import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeData = location.state?.routeData;

  const possibleRoutes = routeData?.possibleRoutes || [];

  return (
    <div className="homepage-container">
      <Navbar />

      <div className="homepage-overlay">
        <div className="homepage-content">
          <h2 className="homepage-title">Recommended Routes</h2>

          {possibleRoutes.length > 0 ? (
            <div className="routes-grid">
              {possibleRoutes.map((route, index) => (
                <div key={index} className="route-card">
                  <div className="route-header">
                    <span className="route-icon">🛣️</span>
                    <h3>Route {route.routeNumber}</h3>
                  </div>

                  <div className="route-info">
                    <p><b>Distance:</b> {route.distance}</p>
                    <p><b>Duration:</b> {route.duration}</p>
                    <p><b>Pollution Preference:</b> {routeData?.data?.pollutionPreference}</p>
                  </div>

                  {/* 🌤️ Weather Section */}
                  <div className="weather-info">
                    <h4>🌦️ Weather Overview</h4>
                    <p><b>Condition:</b> {route.weather?.condition || "N/A"}</p>
                    <p><b>Average Temperature:</b> {route.weather?.avgTemp}°C</p>
                    <p><b>Average Humidity:</b> {route.weather?.avgHumidity}%</p>
                  </div>

                  <details className="waypoints">
                    <summary>🗺️ View Waypoints</summary>
                    <ul>
                      {route.waypoints.map((wp, i) => (
                        <li key={i}>{wp}</li>
                      ))}
                    </ul>
                  </details>

                  <div className="route-actions">
                    <button className="select-btn">Select This Route</button>
                    <button className="view-map-btn">View Full Map</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-routes">No routes available. Please go back and try again.</p>
          )}

          <div className="bot-btn-wrapper">
            <button className="ask-btn" onClick={() => navigate('/chatbot')}>
              Ask bot...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
