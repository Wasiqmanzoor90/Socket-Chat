import Message from '../model/message.js'; // ✅ your path
import mongoose from 'mongoose';

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join a specific chat room
    socket.on('join', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Handle sending message from client
    socket.on('send_message', async (data) => {
      try {
        const { senderId, room, content } = data;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(senderId)) {
          return socket.emit('error_message', 'Invalid sender ID');
        }

        // Save to MongoDB
        const message = new Message({
          sender: senderId,
          room,
          content,
        });

        const savedMessage = await message.save();
        const populatedMessage = await savedMessage.populate("sender", "name email");

        // Emit to all users in the room
        io.to(room).emit('receive_message', populatedMessage);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit('error_message', 'Failed to send message');
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export default socketHandler;
