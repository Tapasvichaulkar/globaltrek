import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guideId: {
      type: Number,
      required: true
    },
    guideName: {
      type: String,
      required: true
    },
    pricePerDay: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },
    guests: {
      type: Number,
      required: true
    },
    message: {
      type: String
    },

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
