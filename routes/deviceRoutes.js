import express from "express";
import { getAllDevices, getCurrentDevice, loginDevice, registerDevice, updateDeviceLocation } from "../controllers/deviceController.js";
import { superAdminAuth } from "../middleware/superAdminAuth.js";

const router = express.Router();

// Register Device
router.post("/register", registerDevice);

// Update Device Location
router.put("/update-location", updateDeviceLocation);
router.get('/alldevices',superAdminAuth , getAllDevices);
router.get('/current-devices' , getCurrentDevice);
router.post('/login', loginDevice); // Device login
export default router;
