import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide"
    },
    guideName: String,
    guidePlace: String,
    pricePerDay: Number,

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    guests: { type: Number, required: true },
    message: String,
    totalAmount: Number,

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);