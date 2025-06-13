import express from "express";
import { createFireIncident, getActiveDeviceIncidents } from "../controllers/recordController.js";

const router = express.Router();

router.post('/create', createFireIncident);
router.get("/active-devices", getActiveDeviceIncidents);


export default router;