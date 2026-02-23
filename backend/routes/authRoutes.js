import express from "express";
import {
  registerUser,
  loginUser,
  userExists,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/userexists", userExists);

export default router;
