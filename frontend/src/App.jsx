import React, { useState } from "react";
import UrlShortner from "./Pages/UrlShortner.jsx";
import UrlStatistics from "./Pages/UrlStatistics.jsx";

const HomePage = () => {
  const [view, setView] = useState("shortner"); // 'shortner' or 'statistics'
  const [shortCode, setShortCode] = useState("");

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>URL Shortener Service</h1>

      <nav style={{ marginBottom: 20 }}>
        <button
          onClick={() => setView("shortner")}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            backgroundColor: view === "shortner" ? "#007BFF" : "#ccc",
            color: view === "shortner" ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Shorten URLs
        </button>

        <button
          onClick={() => setView("statistics")}
          style={{
            padding: "8px 16px",
            backgroundColor: view === "statistics" ? "#007BFF" : "#ccc",
            color: view === "statistics" ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          View Statistics
        </button>
      </nav>

      {view === "shortner" && <UrlShortner />}

      {view === "statistics" && (
        <div>
          <div style={{ marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Enter shortcode to view stats"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value.trim())}
              style={{ padding: 8, width: "300px", marginRight: 10 }}
            />
            <button
              onClick={() => {
                if (!shortCode) alert("Please enter a shortcode");
              }}
              style={{ padding: "8px 16px" }}
            >
              Show Stats
            </button>
          </div>

          {/* Render stats only if shortcode is entered */}
          {shortCode && <UrlStatistics shortCode={shortCode} />}
        </div>
      )}
    </div>
  );
};

export default HomePage;
