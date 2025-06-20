import {Message} from '../models/Message.js';
import {Employee} from '../models/Employee.js';

// Admin posts a new message
export const createMessage = async (req, res) => {
  const { title, body, targetEmployeeIds = [] } = req.body;

  try {
    const message = new Message({
      title,
      body,
      createdBy: req.user.id,
      targetEmployees: targetEmployeeIds.length ? targetEmployeeIds : await Employee.find().distinct('_id')
    });

    await message.save();
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// Employee fetches messages sent to them
export const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.find({ targetEmployees: req.user.id })
      .populate('createdBy', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

// Mark a message as read by employee
export const markMessageAsRead = async (req, res) => {
  const messageId = req.params.id;
  const employeeId = req.user.id;

  try {
    await Message.findByIdAndUpdate(messageId, {
      $addToSet: { readBy: employeeId }
    });

    res.status(200).json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark message', error: err.message });
  }
};

// Admin gets all messages they created
export const getMessagesByAdmin = async (req, res) => {
  try {
    const messages = await Message.find({ createdBy: req.user.id })
      .populate('targetEmployees', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin messages', error: err.message });
  }
};
