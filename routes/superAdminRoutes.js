import express from 'express';
import { loginSuperAdmin } from '../controllers/superAdminAuth.js';
import { registerFireOfficer, deleteFireOfficer, getAllFireOfficers } from '../controllers/fireOfficerController.js';
import { superAdminAuth } from '../middleware/superAdminAuth.js';

const router = express.Router();

router.post('/login', loginSuperAdmin);

// Fire officer management (Protected)
router.post('/fireofficer', superAdminAuth, registerFireOfficer);
router.get('/fireofficers', superAdminAuth, getAllFireOfficers);
router.delete('/fireofficers/:id', superAdminAuth, deleteFireOfficer);

export default router;
