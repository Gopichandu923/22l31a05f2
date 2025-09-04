import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  shortCode: String,
  ip: String,
  userAgent: String,
  referrer: String,
  country: String,
  city: String,
  visitedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Visit", VisitSchema);
