// middlewares/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js"; // ✅ include .js extension

export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request, excluding password
      req.user = await User.findById(decoded.id).select("-password");

      next(); // proceed to next middleware / route
    } catch (error) {
      console.error("Protect middleware error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};
