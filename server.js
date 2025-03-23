import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import deviceRoutes from "./routes/deviceRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP Server

const PORT = process.env.PORT || 8080; // 🔹 Dynamic Port Configuration

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL, // Allow frontend to connect
        credentials: true,
    },
});

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());

// API Routes
app.use("/api/devices", deviceRoutes);

// WebSocket Connection Handling
io.on("connection", (socket) => {
    console.log("🔌 New Device Connected:", socket.id);

    // Listen for sensor data from ESP32
    socket.on("sensorData", (data) => {
        console.log("📡 Received Data:", data);
        io.emit("newData", data); // Broadcast data to all connected clients
    });

    // Handle Disconnection
    socket.on("disconnect", () => {
        console.log("❌ Device Disconnected:", socket.id);
    });
});

// Simple API Test
app.get("/", (req, res) => {
    res.send("🔥 Aerosecure Backend is Running!");
});

// Connect to MongoDB and Start Server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
