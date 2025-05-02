import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import deviceRoutes from './routes/deviceRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import fireOfficerRoutes from './routes/fireOfficerRoutes.js';
import connectDB from "./config/db.js"

// Environment variables configuration
dotenv.config();

// MongoDB connection (you can import your DB configuration here)
// import connectDB from "./config/db.js";

// Initialize Express
const app = express();
const server = http.createServer(app);

// Enable CORS for all origins (adjust as necessary)
app.use(cors({ credentials: true, origin: '*' }));

// Use JSON parsing middleware
app.use(express.json());

// API Routes
app.use("/api/devices", deviceRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/fireofficer', fireOfficerRoutes);

// WebSocket setup
const wss = new WebSocketServer({ server });  // Use same HTTP server for WebSocket

wss.on('connection', (ws) => {
  console.log('🔌 Client connected');

  // When receiving messages from ESP32
  ws.on('message', (message) => {
    console.log('📨 Received from ESP32:', message.toString());

    // Forward the message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });

  // When a client disconnects
  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

// Simple API Test route
app.get("/", (req, res) => {
  res.send("🔥 AeroSecure Backend is Running!");
});

// MongoDB connection (uncomment and modify if required)
// connectDB().then(() => {
  const PORT = process.env.PORT || 8080;

  // Start HTTP server and WebSocket on the same port
  

connectDB().then(() => {

        server.listen(PORT, () => {
            console.log(`🚀🚀 Socket.io server running on port ${PORT}`)
        })
     }); 
