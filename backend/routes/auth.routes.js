import express from 'express';
import { login, changePassword } from '../controllers/auth.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// PUT /api/auth/change-password
router.put('/change-password', verifyToken, changePassword);

export default router;
