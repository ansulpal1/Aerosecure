import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import deviceRoutes from "./routes/deviceRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use("/api/devices", deviceRoutes);

const PORT = process.env.PORT || 8080;

// Start HTTP Server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Create WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log("🟢 New WebSocket Connection");

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log("📡 Received Data:", data);

            // Broadcast the received data to all connected clients
            wss.clients.forEach(client => {
                if (client.readyState === 1) {  // Ensure client is open
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error("❌ Error Parsing WebSocket Message:", error);
        }
    });

    ws.on('close', () => {
        console.log("🔴 WebSocket Disconnected");
    });
});

console.log("⚡ WebSocket Server Ready!");
