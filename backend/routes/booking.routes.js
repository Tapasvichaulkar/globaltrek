import express from "express";
import { acceptBooking, createBooking, getAllBookings, rejectBooking ,getBookingsByGuide  } from "../controllers/bookingController.js";


const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/guide/:guideId", getBookingsByGuide);
router.put("/accept/:id", acceptBooking);
router.put("/reject/:id", rejectBooking);

export default router;