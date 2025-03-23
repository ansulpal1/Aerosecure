import express from 'express';
import { WebSocketServer } from 'ws'; // Import WebSocket library
import cors from 'cors';
import dotenv from 'dotenv';
import deviceRoutes from './routes/deviceRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/devices', deviceRoutes);

const PORT = process.env.PORT || 8080;

// Simple API Test
app.get('/', (req, res) => {
  res.send('🔥 Aerosecure Backend is Running!');
});

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 🔹 Setup WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('✅ New WebSocket Connection!');

  ws.on('message', (data) => {
    console.log('📡 Received Data:', data.toString());
  });

  ws.on('close', () => {
    console.log('❌ WebSocket Disconnected');
  });
});
