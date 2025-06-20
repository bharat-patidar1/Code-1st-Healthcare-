import express from 'express';
import {
  sendMessage,
  getChatHistory,
} from '../controllers/chat.controller.js';

import {verifyToken} from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/chat → Send a message
router.post('/', verifyToken, sendMessage);

// GET /api/chat/:otherId → Get chat history with a user
router.get('/:otherId', verifyToken, getChatHistory);

export default router;
