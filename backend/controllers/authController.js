import {
  caesarEncrypt,
  aesEncrypt,
  aesDecrypt
} from "../config/encryption.js";

import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔐 Encrypt Email using Caesar
    const encryptedEmail = caesarEncrypt(email);

    const userExists = await User.findOne({ email: encryptedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Encrypt Password using AES
    const encryptedPassword = aesEncrypt(password);

    await User.create({
      name,
      email: encryptedEmail,
      password: encryptedPassword,
      phone,
      address,
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Apply SAME Caesar to email
    const encryptedEmail = caesarEncrypt(email);

    const user = await User.findOne({ email: encryptedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Decrypt stored password
    const decryptedPassword = aesDecrypt(user.password);

    if (password !== decryptedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email, // send original email back
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};