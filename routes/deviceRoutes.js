import express from "express";
import { registerDevice, updateDeviceLocation } from "../controllers/deviceController.js";

const router = express.Router();

// Register Device
router.post("/register", registerDevice);

// Update Device Location
router.put("/update-location", updateDeviceLocation);

export default router;
