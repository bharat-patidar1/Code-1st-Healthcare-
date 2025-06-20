import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true,
  },
  senderModel: {
    type: String,
    enum: ['Admin', 'Employee'],
    required: true,
  },
  receiverModel: {
    type: String,
    enum: ['Admin', 'Employee'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: { type: Boolean, default: false },
}, { timestamps: true ,collection : "Chat"});

export const Chat = mongoose.model('Chat', chatSchema);
