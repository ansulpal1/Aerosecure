import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import deviceRoutes from './routes/deviceRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import fireOfficerRoutes from './routes/fireOfficerRoutes.js';
import connectDB from "./config/db.js"
import Device from './models/deviceModel.js';
// Environment variables configuration
dotenv.config();


// Initialize Express
const app = express();
const server = http.createServer(app);
const connectedClients = [];
// Enable CORS for all origins (adjust as necessary)
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

// Use JSON parsing middleware
app.use(express.json());

// API Routes
app.use("/api/devices", deviceRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/fireofficer', fireOfficerRoutes);
app.use('/api/record', recordRoutes);

// WebSocket setup
const wss = new WebSocketServer({ server });  // Use same HTTP server for WebSocket




wss.on('connection', (ws) => {
  console.log('🟢 WebSocket client connected');

  ws.on('message', async (message) => {
    console.log('📨 Received from ESP32:', message.toString());

    try {
      const raw = message.toString();  // Step 1: Get string
      const data = JSON.parse(raw.replace("esp32-data:", "")); // Step 2: Remove prefix and parse JSON

      console.log('📨 Received from ESP32 ansul:', data.deviceId);

      // Step 1: Register client
      if (data.type === "register") {
        ws.deviceId = data.deviceId || null;
        ws.role = data.role; // 'user' or 'officer'
        connectedClients.push(ws);
        return;
      }

      // Step 2: ESP32 sent sensor data
      if (data.deviceId) {
        const device = await Device.findOne({ deviceId: data.deviceId });

        if (!device) {
          console.log("❌ Device not found");
          return;
        }



        const enrichedData = {
          type: "alert",
          deviceId: device.deviceId,
          location: device.location,
          sensorData: {
            temperature: data.temperature,
            aqi: data.aqi,
            status: data.status,
            fire: data.fire,
            co: data.co,
            oxygen: data.oxygen,
            humidity: data.humidity,
            k_fire: data.k_fire,
          },
          user: {
            name: device.name,
            email: device.email,
            phone: device.phone,
            family_member: device.family_member,
          },
          alertTime: new Date()
        };

        // ✅ Step 1: Immediately send alert to user
        connectedClients.forEach(client => {
          if (client.role === "user" && client.deviceId === device.deviceId && client.readyState === 1) {
            client.send(JSON.stringify(enrichedData));
          }
        });





        connectedClients.forEach(client => {
          if (client.role === "officer" && client.readyState === 1) {
            client.send(JSON.stringify(enrichedData));
          }
        });


        connectedClients.forEach(client => {
          if (client.role === "user" && client.deviceId === device.deviceId && client.readyState === 1) {
            client.send(JSON.stringify(enrichedData));
          }
        });
      }

    } catch (err) {
      console.error("❌ WebSocket error:", err);
    }
  });

  ws.on('close', () => {
    const i = connectedClients.indexOf(ws);
    if (i !== -1) connectedClients.splice(i, 1);
    console.log('🔴 WebSocket client disconnected');
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
