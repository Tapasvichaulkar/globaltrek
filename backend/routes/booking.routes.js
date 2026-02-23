import express from "express";
import {
  createBooking,
  getAllBookings
} from "../controllers/booking.controller.js";

const router = express.Router();

// POST → Save booking
router.post("/", createBooking);

// GET → Fetch all bookings (Admin)
router.get("/", getAllBookings);

export default router;
