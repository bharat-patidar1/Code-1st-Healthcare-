import express from 'express';
import {
  createMessage,
  getMyMessages,
  markMessageAsRead,
  getMessagesByAdmin
} from '../controllers/message.controller.js';

import {verifyToken} from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/role.middleware.js';

const router = express.Router();

// Admin posts a message
router.post('/', verifyToken, checkRole('admin'), createMessage);

// Admin views their sent messages
router.get('/admin', verifyToken, checkRole('admin'), getMessagesByAdmin);

// Employee views received messages
router.get('/me', verifyToken, checkRole('employee'), getMyMessages);

// Employee marks message as read
router.put('/:id/read', verifyToken, checkRole('employee'), markMessageAsRead);

export default router;
