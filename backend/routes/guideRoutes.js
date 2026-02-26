import express from "express";
import { createGuide, deleteGuide, getAllGuides, updateGuide } from "../controllers/guideController.js";


const router = express.Router();

router.post("/", createGuide);
router.get("/", getAllGuides);
router.put("/:id", updateGuide);
router.delete("/:id", deleteGuide);

export default router;