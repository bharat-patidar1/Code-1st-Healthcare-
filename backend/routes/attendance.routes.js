import express from 'express';
import {
  clockIn,
  clockOut,
  getAllAttendance,
  getMyAttendance
} from '../controllers/attendance.controller.js';

import {verifyToken} from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/role.middleware.js';

const router = express.Router();

// Employee actions
router.post('/clock-in', verifyToken, checkRole('employee'), clockIn);
router.post('/clock-out', verifyToken, checkRole('employee'), clockOut);
router.get('/me', verifyToken, checkRole('employee'), getMyAttendance);

// Admin action
router.get('/', verifyToken, checkRole('admin'), getAllAttendance);

export default router;
