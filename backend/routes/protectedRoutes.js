import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* USER PAGES */
router.get(
  "/user-page",
  protect,
  authorizeRoles("user", "admin"),
  (req, res) => {
    res.json({ message: "User Page Access Granted" });
  }
);


/* ADMIN PAGES */
router.get(
  "/admin-page",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin Page Access Granted" });
  }
);

export default router;