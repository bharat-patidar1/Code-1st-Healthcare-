import {Chat} from '../models/Chat.js';

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Join room for specific user
    socket.on('join', ({ userId }) => {
      socket.join(userId);
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
      const {
        sender,
        receiver,
        senderModel,
        receiverModel,
        message,
      } = data;

      const chat = new Chat({
        sender,
        receiver,
        senderModel,
        receiverModel,
        message,
      });

      await chat.save();

      // Emit to receiver room
      io.to(receiver).emit('receive_message', {
        sender,
        message,
        createdAt: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};
