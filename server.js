import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import deviceRoutes from './routes/deviceRoutes.js';
import connectDB from './config/db.js';
import http from 'http';

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/devices', deviceRoutes);

const PORT = process.env.PORT || 8080;

// ✅ Create an HTTP Server
const server = http.createServer(app);

// ✅ Create WebSocket Server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    console.log('✅ WebSocket Connected');

    ws.on('message', (data) => {
        console.log('📡 Received:', data.toString());
    });

    ws.on('close', () => {
        console.log('❌ WebSocket Disconnected');
    });

    // Send a test message
    ws.send('Hello from WebSocket Server!');
});
// Simple API Test
app.get('/', (req, res) => {
    res.send('🔥 Aerosecure Backend is Running!');
  });

// ✅ Upgrade HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// ✅ Connect to MongoDB and Start Server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
