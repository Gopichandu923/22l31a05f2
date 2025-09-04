import UrlShortner from "../models/urlShortnerModel.js";
import { ShortCodeGenerator } from "../modules/shortCode.js";

const createShortUrl = async (req, res) => {
  try {
    let { url, validity = 30, shortcode } = req.body;

    // Calculate expiry date
    const now = new Date();
    const expiry = new Date(now.getTime() + validity * 24 * 60 * 60 * 1000);

    // Check if shortcode already exists
    if (shortcode) {
      const existing = await UrlShortner.findOne({ shortCode: shortcode });
      if (existing) {
        return res.status(400).json({ message: "Shortcode already in use" });
      }
    } else {
      // Generate a new unique shortcode
      let isUnique = false;
      while (!isUnique) {
        shortcode = ShortCodeGenerator();
        const existing = await UrlShortner.findOne({ shortCode: shortcode });
        if (!existing) isUnique = true;
      }
    }

    // Save to DB
    const newUrl = new UrlShortner({
      url,
      shortCode: shortcode,
      validity,
      expiry,
    });

    await newUrl.save();

    res.status(201).json({
      shortLink: `http://localhost:3000/${shortcode}`,
      expiry,
    });
  } catch (err) {
    console.error("Error while creating short URL:", err);
    res.status(500).json({
      message: "Error occurred while creating the short URL",
    });
  }
};

const getUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const urlEntry = await UrlShortner.findOne({ shortCode: id });

    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    const now = new Date();
    if (urlEntry.expiry < now) {
      return res.status(410).json({ message: "Short URL has expired" });
    }

    // Increment openCount
    urlEntry.openCount += 1;
    await urlEntry.save();

    res.redirect(urlEntry.url);
  } catch (err) {
    console.error("Error retrieving URL:", err);
    res.status(500).json({ message: "Server error while retrieving URL" });
  }
};

export { createShortUrl, getUrl };
