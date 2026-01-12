// src/components/RouteMap.js
import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const defaultCenter = [12.9716, 77.5946]; // fallback center (Bengaluru)

export default function RouteMap({ routes = [], selectedIndex = 0 }){
  const selected = routes[selectedIndex] || null;

  // convert route.geometry to LatLng array
  const makeLatLngs = (geom) => {
    // Expecting geom as GeoJSON LineString or array [[lat,lon],...]
    if(!geom) return [];
    if(geom.type === "LineString" && Array.isArray(geom.coordinates)) {
      // ORS often returns [lon,lat] pairs — convert to [lat,lon]
      return geom.coordinates.map(c => [c[1], c[0]]);
    }
    if(Array.isArray(geom) && Array.isArray(geom[0])) {
      return geom.map(p => [p[0], p[1]]);
    }
    return [];
  };

  const lines = routes.map(r => makeLatLngs(r.geometry));
  const center = selected && lines[selectedIndex] && lines[selectedIndex][0] ? lines[selectedIndex][0] : defaultCenter;

  return (
    <MapContainer center={center} zoom={9} style={{height:"100vh", width:"100%"}}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {lines.map((latlngs, idx) => (
        <Polyline
          key={idx}
          positions={latlngs}
          color={idx === selectedIndex ? "#2b6cb0" : "#888"}
          weight={ idx === selectedIndex ? 6 : 4 }
          opacity={ idx === selectedIndex ? 0.95 : 0.6 }
        />
      ))}

      {selected && lines[selectedIndex] && lines[selectedIndex].length > 0 && (
        <>
          <Marker position={lines[selectedIndex][0]} icon={L.icon({iconUrl:"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize:[25,41]})}>
            <Popup>Start</Popup>
          </Marker>
          <Marker position={lines[selectedIndex][lines[selectedIndex].length-1]} icon={L.icon({iconUrl:"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize:[25,41]})}>
            <Popup>End</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}
