import mongoose from "mongoose";

const UrlShortnerSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  openCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiry: {
    type: Date,
    required: true,
  },
  validity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("UrlShortner", UrlShortnerSchema);
