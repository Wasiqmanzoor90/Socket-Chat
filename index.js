import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './config/dbConnect.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './socket/socketHandler.js';

// Load environment variables
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
ConnectDb();

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,           // From .env (Vercel frontend URL)
  'http://localhost:3000'           // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked CORS request from:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);

// Create HTTP server and attach Socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize socket handlers
socketHandler(io);

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
