import mongoose from "mongoose";

const UrlShortnerSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true,
    index: true, // index for fast search
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  openCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  expiry: {
    type: Date,
    required: true,
  },
  validity: {
    type: Number,
    required: true,
    min: [1, "Validity must be at least 1 day"],
  },
});

export default mongoose.model("UrlShortner", UrlShortnerSchema);
