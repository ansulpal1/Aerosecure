import express from 'express';
import { loginFireOfficer, updatePassword } from '../controllers/fireOfficerController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginFireOfficer); // Fire Officer login
router.put('/update-password', auth, updatePassword); // After login password update

export default router;
