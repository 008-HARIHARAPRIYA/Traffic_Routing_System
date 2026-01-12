// src/components/InputForm.js
import React, { useState } from "react";
import axios from "axios";

export default function InputForm({ onRoutes }){
  const [source, setSource] = useState("13.0827,80.2707"); // lat,lon
  const [destination, setDestination] = useState("9.9252,78.1198");
  const [prefTime, setPrefTime] = useState(0.6);
  const [prefPollution, setPrefPollution] = useState(0.3);
  const [prefSafety, setPrefSafety] = useState(0.1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);

    try {
      // convert lat,lon strings to objects if you prefer; here we send raw
      const payload = {
        source, destination,
        preferences: { alpha: prefTime, beta: prefPollution, gamma: prefSafety }
      };

      // Adjust URL if your backend route differs.
      const res = await axios.post("/api/routes/optimize", payload);
      // expected res.data = [{ id, distance, travelTime, dynamicWeight, geometry }, ...]
      onRoutes(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Request failed");
      onRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{marginBottom:18}}>
      <label style={{display:"block", fontSize:13}}>Source (lat,lon)</label>
      <input value={source} onChange={e=>setSource(e.target.value)} style={{width:"100%", padding:8, marginBottom:8}} />
      <label style={{display:"block", fontSize:13}}>Destination (lat,lon)</label>
      <input value={destination} onChange={e=>setDestination(e.target.value)} style={{width:"100%", padding:8, marginBottom:8}} />

      <div style={{display:"flex", gap:8, marginTop:8, marginBottom:8}}>
        <div style={{flex:1}}>
          <label style={{fontSize:12}}>Time</label>
          <input type="range" min="0" max="1" step="0.1" value={prefTime} onChange={e=>setPrefTime(Number(e.target.value))}/>
        </div>
        <div style={{flex:1}}>
          <label style={{fontSize:12}}>Pollution</label>
          <input type="range" min="0" max="1" step="0.1" value={prefPollution} onChange={e=>setPrefPollution(Number(e.target.value))}/>
        </div>
        <div style={{flex:1}}>
          <label style={{fontSize:12}}>Safety</label>
          <input type="range" min="0" max="1" step="0.1" value={prefSafety} onChange={e=>setPrefSafety(Number(e.target.value))}/>
        </div>
      </div>

      <button type="submit" disabled={loading} style={{padding:"10px 14px", background:"#2b6cb0", color:"#fff", border:"none", borderRadius:6}}>
        {loading ? "Optimizing..." : "Get Routes"}
      </button>

      {error && <div style={{marginTop:8,color:"crimson"}}>{error}</div>}
    </form>
  );
}
