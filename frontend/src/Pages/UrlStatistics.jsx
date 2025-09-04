import React, { useState, useEffect } from "react";

const UrlStatistics = ({ shortCode }) => {
  const [stats, setStats] = useState(null);
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortCode) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/urlshortner/${shortCode}`
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data.stats);
        setVisits(data.visits);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, [shortCode]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return <p>Loading statistics...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h2>Statistics for: {shortCode}</h2>
      <p>
        <strong>Total Opens:</strong> {stats.openCount}
      </p>
      <h3>Visit Details:</h3>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Visited At</th>
            <th>IP Address</th>
            <th>Country</th>
            <th>City</th>
            <th>Referrer</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>
          {visits.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No visit data available
              </td>
            </tr>
          ) : (
            visits.map((visit, idx) => (
              <tr key={idx}>
                <td>{new Date(visit.visitedAt).toLocaleString()}</td>
                <td>{visit.ip}</td>
                <td>{visit.country || "N/A"}</td>
                <td>{visit.city || "N/A"}</td>
                <td>{visit.referrer || "Direct"}</td>
                <td>{visit.userAgent}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlStatistics;
