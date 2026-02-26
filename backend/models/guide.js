import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    place: { type: String, required: true },
    category: String,
    image: String,
    rating: { type: Number, default: 4.5 },
    experience: String,
    languages: [{ type: String }],
    price: { type: Number, required: true },
    about: String
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);