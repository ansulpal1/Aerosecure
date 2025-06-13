import express from 'express';
import { assignWorkToOfficer, getUnassignedOfficers, loginFireOfficer, officerDetailes, updatePassword } from '../controllers/fireOfficerController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginFireOfficer); // Fire Officer login
router.post('/update-password', auth, updatePassword);
router.get('/current-officer' ,auth, officerDetailes); // After login password update
router.get('/officers/unassigned' ,auth, getUnassignedOfficers);
router.post('/officers/assign-work' ,auth, assignWorkToOfficer);

export default router;
