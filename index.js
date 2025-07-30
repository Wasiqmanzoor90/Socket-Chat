import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './config/dbConnect.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import http from 'http';
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';
import { Server } from 'socket.io';
import socketHandler from './socket/socketHandler.js';

// Load environment variables first
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// CORS configuration - this is the key fix
const corsOptions = {
  origin: [
    'https://socket-io-steel.vercel.app',  // Your production frontend URL
    'http://localhost:3000',               // Local development
    process.env.CLIENT_URL                 // Environment variable fallback
  ].filter(Boolean), // Remove any undefined values
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-Requested-With'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware BEFORE other middleware
app.use(cors(corsOptions));

// Essential middleware for parsing requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Manual preflight handling (additional safety net)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://socket-io-steel.vercel.app',
    'http://localhost:3000',
    process.env.CLIENT_URL
  ].filter(Boolean);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Cache-Control');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send();
    return;
  }
  
  next();
});

// Connect to database
ConnectDb();

// Create Socket.IO server with CORS
const io = new Server(server, {
  cors: {
    origin: [
      'https://socket-io-steel.vercel.app',
      'http://localhost:3000',
      process.env.CLIENT_URL
    ].filter(Boolean),
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', cors: 'enabled' });
});

// Socket.io handler
socketHandler(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for origins:`, corsOptions.origin);
});