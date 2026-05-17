import { md5Encrypt, railFenceEncrypt } from "../config/encryption.js";
import Booking from "../models/booking.js";

/* ================= CREATE BOOKING ================= */
export const createBooking = async (req, res) => {
  try {
    const encryptedData = { ...req.body };

    // 🔐 Encrypt Name (Rail + MD5)
    if (encryptedData.name) {
      const rail = railFenceEncrypt(encryptedData.name);
      encryptedData.name = md5Encrypt(rail);
    }

    // 🔐 Encrypt Destination (Rail + MD5)
    if (encryptedData.destination) {
      const rail = railFenceEncrypt(encryptedData.destination);
      encryptedData.destination = md5Encrypt(rail);
    }

    // 🔐 Encrypt Email (Rail + MD5)
    if (encryptedData.email) {
      const rail = railFenceEncrypt(encryptedData.email);
      encryptedData.email = md5Encrypt(rail);
    }

    // 🔐 Encrypt Phone (ONLY Rail Fence)
    if (encryptedData.phone) {
      encryptedData.phone = railFenceEncrypt(
        encryptedData.phone.toString()
      );
    }

    const booking = await Booking.create(encryptedData);

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL BOOKINGS ================= */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ACCEPT BOOKING ================= */
export const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Accepted" },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= REJECT BOOKING ================= */
export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BOOKINGS BY GUIDE ================= */
export const getBookingsByGuide = async (req, res) => {
  try {
    const { guideId } = req.params;

    const bookings = await Booking.find({
      guideId: guideId
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};