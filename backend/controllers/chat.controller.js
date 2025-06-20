import {Chat} from '../models/Chat.js';

// Fallback: send a message (if sockets not used)
export const sendMessage = async (req, res) => {
  const { receiverId, receiverModel, message } = req.body;
  const { id: sender, role: senderModel } = req.user;

  try {
    const chat = new Chat({
      sender,
      receiver: receiverId,
      senderModel,
      receiverModel,
      message,
    });

    await chat.save();
    res.status(201).json({ message: 'Message sent', data: chat });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// Fetch chat history between current user and another user
export const getChatHistory = async (req, res) => {
  const { id: userId, role: userModel } = req.user;
  const { otherId } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: otherId },
        { sender: otherId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chat history', error: err.message });
  }
};
