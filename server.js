import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import deviceRoutes from "./routes/deviceRoutes.js";
dotenv.config();

import connectDB from "./config/db.js"

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json());


app.use("/api/devices", deviceRoutes);


const PORT = 8080 || process.env.PORT;
// Simple API Test
app.get("/", (req, res) => {
    res.send("🔥 Aerosecure Backend is Running!");
});



// Start Server
// Connect to MongoDB

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
    })
});
