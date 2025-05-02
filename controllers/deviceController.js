import bcrypt from "bcrypt";
import Device from "../models/deviceModel.js";
import jwt from 'jsonwebtoken';


// 📌 Register a New Device
export const registerDevice = async (req, res) => {
    try {
        console.log("📥 Incoming Request:", req.body);

        const { deviceId } = req.body;
        if (!deviceId) {
            return res.status(400).json({ error: "Device ID is required!" });
        }

        // 🔍 Check if device already exists
        let existingDevice = await Device.findOne({ deviceId });
        if (existingDevice) {
            return res.status(400).json({ message: "Device already registered!" });
        }

        // 🔑 Generate and hash password
        const password = "12345678"
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // 💾 Save Device to DB
        const newDevice = new Device({
            deviceId,
            password: hashedPassword,
            location: null, // Location will be updated later
            
        });
        await newDevice.save();

        console.log("✅ Device Registered:", { deviceId, password });

        res.status(201).json({ message: "Device registered!", deviceId, password });
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


// 📌 Update Device Location
export const updateDeviceLocation = async (req, res) => {
    try {
        const { deviceId, address, latitude, longitude } = req.body;

        const device = await Device.findOne({ deviceId });
        if (!device) {
            return res.status(404).json({ message: "Device not found!" });
        }

        device.location = { address, latitude, longitude };
        await device.save();

        res.status(200).json({ message: "Location updated successfully!", device });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// 📌 Get All Registered Devices (Only for Super Admin)
export const getAllDevices = async (req, res) => {
    try {
      // Optionally, verify user role from the middleware (assuming req.user is set)
      if (!req.user || req.user.role !== 'superadmin') {
        return res.status(403).json({ message: "Access denied. Super Admin only." });
      }
  
      const devices = await Device.find().sort({ createdAt: -1 });
      res.status(200).json({ devices });
    } catch (error) {
      console.error("❌ Failed to fetch devices:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  // 📌 Get Current User's Device Details
export const getCurrentDevice = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized access." });
      }
  
      // Assuming the device is linked by ID or email or deviceId
      const device = await Device.findOne({ _id: req.user._id }); // or { deviceId: req.user.deviceId }
  
      if (!device) {
        return res.status(404).json({ message: "Device not found." });
      }
  
      res.status(200).json({ device });
    } catch (error) {
      console.error("❌ Failed to fetch device details:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // 🔐 Login Device
export const loginDevice = async (req, res) => {
    const { identifier, password } = req.body;
    const query = identifier.includes("@")
      ? { email: identifier }
      : { deviceId: identifier };
  
    try {
      const device = await Device.findOne( query );
      if (!device) return res.status(404).json({ message: 'Device not found' });
  
      const isMatch = await bcrypt.compare(password, device.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: device._id, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        device: {
          id: device._id,
          name: device.name,
          email: device.email,
          deviceId: device.deviceId
          
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  