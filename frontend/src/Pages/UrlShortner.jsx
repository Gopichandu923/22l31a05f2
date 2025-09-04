import React, { useState } from "react";

const UrlShortner = () => {
  // Initialize with 5 empty strings representing 5 input fields
  const [urls, setUrls] = useState(["", "", "", "", ""]);
  const [results, setResults] = useState([]); // To store short URLs returned from server
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change for each URL input field
  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  // Submit handler to call your backend API to shorten URLs
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty URLs
    const validUrls = urls.filter((url) => url.trim() !== "");

    if (validUrls.length === 0) {
      setError("Please enter at least one URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Assuming your API accepts one URL at a time
      // and returns the shortened URL

      // Make parallel requests for each URL
      const promises = validUrls.map((url) =>
        fetch("http://localhost:3000/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }).then((res) => res.json())
      );

      const results = await Promise.all(promises);
      setResults(results);
    } catch (err) {
      setError("Error shortening URLs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        {[0, 1, 2, 3, 4].map((i) => (
          <input
            key={i}
            type="url"
            placeholder={`Enter URL #${i + 1}`}
            value={urls[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URLs"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Shortened URLs:</h3>
          <ul>
            {results.map((result, idx) => (
              <li key={idx}>
                <a
                  href={result.shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.shortLink}
                </a>{" "}
                (expires on: {new Date(result.expiry).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UrlShortner;
