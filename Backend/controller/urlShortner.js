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
    urlEntry.openCount = (urlEntry.openCount || 0) + 1;
    await urlEntry.save();

    // Get visitor info
    const ip =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"] || "";
    const referrer = req.headers["referer"] || "";

    // Get geo info from IP
    const geo = geoip.lookup(ip) || {};
    const country = geo.country || "";
    const city = geo.city || "";

    // Save visit
    const visit = new Visit({
      shortCode: id,
      ip,
      userAgent,
      referrer,
      country,
      city,
    });
    await visit.save();

    res.status(200).json(urlEntry.);
  } catch (err) {
    console.error("Error retrieving URL:", err);
    res.status(500).json({ message: "Server error while retrieving URL" });
  }
};

export { createShortUrl, getUrl };
