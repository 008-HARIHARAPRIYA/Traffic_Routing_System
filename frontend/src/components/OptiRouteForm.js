import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './OptiRouteForm.css';

function OptiRouteForm() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const routeData = {
      source,
      destination,
      travelMode: "car",
      timeConstraint: 60,
      pollutionPreference: "low",
    };

    try {
      const response = await fetch("http://localhost:5000/api/routes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routeData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        // ✅ Navigate to HomePage with the route data
        navigate("/HomePage", { state: { routeData: result } });
      } else {
        alert("❌ " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Failed to fetch route. Please try again.");
    }
  };

  return (
    <div className="optiroute-page">
      <Navbar />
      <div className="form-wrapper">
        <h2>Find the Best Route</h2>
        <form onSubmit={handleSubmit} className="optiroute-form">
          <label>
            Source Location:
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Vandiyur, Madurai"
              required
            />
          </label>

          <label>
            Destination Location:
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Periyar Nilayam, Madurai"
              required
            />
          </label>

          <label>
            Any Specific Preferences:
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="avoid-traffic">Avoid heavy traffic</option>
              <option value="check-weather">Check weather conditions</option>
              <option value="low">Choose low pollution route</option>
            </select>
          </label>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Fetching Route..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OptiRouteForm;
