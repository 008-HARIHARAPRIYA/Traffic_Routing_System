// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import OptiRouteForm from "./components/OptiRouteForm";
import HomePage from "./components/HomePage";
import ChatbotPage from "./components/ChatbotPage";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="overlay-content">
          <h1>About Us</h1>
          <p>
            We build smart and safe traffic routing solutions using AI,
            combining real-time traffic, weather, and pollution data. Our goal
            is to help commuters reach their destination faster, safer, and
            greener.
          </p>
          <button className="get-started" onClick={() => window.location.href = "/find-opti-route"}>Get Started</button>
        </div>
      </section>
      <footer className="footer">
        <ul className="features">
          <li>
            <img src="https://img.icons8.com/ios-filled/24/00d4ff/car.png" alt="Real-time Route Updates" />
            <span>Real-time Route Updates</span>
          </li>
          <li>
            <img src="https://img.icons8.com/ios-filled/24/00d4ff/leaf.png" alt="Eco-Friendly Options" />
            <span>Eco-Friendly Options</span>
          </li>
          <li>
            <img src="https://img.icons8.com/ios-filled/24/00d4ff/ai.png" alt="AI-Powered Suggestions" />
            <span>AI-Powered Suggestions</span>
          </li>
          <li>
            <img src="https://img.icons8.com/ios-filled/24/00d4ff/road.png" alt="Multiple Route Choices" />
            <span>Multiple Route Choices</span>
          </li>
          <li>
            <img src="https://img.icons8.com/ios-filled/24/00d4ff/weather.png" alt="Weather & Pollution Aware" />
            <span>Weather & Pollution Aware</span>
          </li>
        </ul>
        <hr />
        <div className="footer-info">
          <p>© 2025 Adaptive Traffic Routing – Smarter, Safer, Greener Travel</p>
          <p>harini@gmail.com | +1 386-688-3295</p>
        </div>
      </footer>
    </div>
  );
}

function About() {
  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="overlay-content">
          <h1>About Page</h1>
          <p>This is the About page content.</p>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="overlay-content">
          <h1>Contact Page</h1>
          <p>Reach us at harini@gmail.com</p>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-opti-route" element={<OptiRouteForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </Router>
  );
}

export default App;