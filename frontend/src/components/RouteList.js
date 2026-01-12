// src/components/RouteList.js
import React from "react";

export default function RouteList({ routes = [], selectedIndex=0, onSelect=()=>{} }){
  if(!routes.length) return <div style={{marginTop:10, color:"#777"}}>No routes yet. Enter source & destination to get suggestions.</div>;

  return (
    <div style={{marginTop:12}}>
      <h3 style={{fontSize:14, marginBottom:8}}>Route Options</h3>
      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        {routes.map((r, i) => (
          <div key={r.id || i}
               onClick={()=>onSelect(i)}
               style={{
                 padding:10,
                 borderRadius:8,
                 border: i===selectedIndex ? "2px solid #2b6cb0" : "1px solid #eee",
                 background: i===selectedIndex ? "#f0f6ff" : "#fff",
                 cursor:"pointer"
               }}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <strong>Option {i+1}</strong>
              <span style={{fontSize:12, color:"#555"}}>{(r.distance/1000).toFixed(2)} km</span>
            </div>
            <div style={{fontSize:13, color:"#333", marginTop:6}}>
              ETA: {(r.travelTime/3600).toFixed(2)} h — Score: {r.dynamicWeight ? r.dynamicWeight.toFixed(1) : "N/A"}
            </div>
            <div style={{fontSize:12, color:"#666", marginTop:6}}>
              {r.summary || r.note || "Route information available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
