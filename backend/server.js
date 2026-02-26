
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import bookingRoutes from "./routes/booking.routes.js";
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/destinations", destinationRoutes);
app.use("/api", protectedRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/bookings", bookingRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("Guide Booking Backend Running ✅");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
