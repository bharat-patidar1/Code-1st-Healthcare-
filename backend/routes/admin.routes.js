import express from 'express';
// import { createAdmin, getAllAdmins } from '../controllers/admin.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/role.middleware.js';
import { createAdmin, getAllAdmins } from '../controllers/admin.controller.js';

const router = express.Router();

// POST /api/admin → Only another admin can create admin
router.post('/', verifyToken, checkRole('admin'), createAdmin);

// GET /api/admin → Get all admins
router.get('/', verifyToken, checkRole('admin'), getAllAdmins);

export default router;
