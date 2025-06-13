import express from "express";
import { changePassword, getAllDevices,  loginDevice, registerDevice, updateDeviceLocation, updateUserDetails, userDetailes } from "../controllers/deviceController.js";
import { superAdminAuth } from "../middleware/superAdminAuth.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register Device
router.post("/register", registerDevice);

// Update Device Location
router.put("/update-location", updateDeviceLocation);
router.get('/alldevices',superAdminAuth , getAllDevices);

router.get('/current-user' ,auth, userDetailes);
router.get('/current-user1' , userDetailes);
router.post('/login', loginDevice); // Device login
router.post('/changePassword',auth,changePassword); 
router.post('/updateDetails',auth,updateUserDetails); 
export default router;
