import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './config/dbConnect.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import http from 'http'; 
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';
import { Server } from 'socket.io'; // Import Server from socket.io
import socketHandler from './socket/socketHandler.js';


// Suppress dotenv logs
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server manually instead of using app.listen
const server = http.createServer(app);

//create a socket.io server
const io = new Server(server,{
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  
  }
})





//connet to the database
ConnectDb();


// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL,            // For production (Vercel)
    "http://localhost:3000"           // For local dev
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));




//Routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);


// Socket.io handler
socketHandler(io); // Initialize socket handler


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
