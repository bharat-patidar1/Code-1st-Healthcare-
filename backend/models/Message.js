import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  targetEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
}, { timestamps: true , collection : 'Message'});

export const Message = mongoose.model('Message', messageSchema);
