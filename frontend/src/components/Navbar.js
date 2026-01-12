// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">AdaptiveTraffic Routing</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/find-opti-route">Find OptiRoute</Link></li>
        <li><Link to="/">Contact</Link></li>
        
      </ul>
      <div className="theme-toggle">🌙</div>
    </nav>
  );
}

export default Navbar;