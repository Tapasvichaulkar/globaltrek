import express from "express";
import {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

router.get("/", getAllDestinations);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

export default router;