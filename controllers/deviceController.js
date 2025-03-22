import bcrypt from "bcrypt";
import Device from "../models/deviceModel.js";

// 📌 Generate Random Password Function
const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8); // Generate 8-character password
};

// 📌 Register a New Device
export const registerDevice = async (req, res) => {
    try {
        const { deviceId } = req.body;

        // Check if device already exists
        let existingDevice = await Device.findOne({ deviceId });
        if (existingDevice) {
            return res.status(400).json({ message: "Device already registered!" });
        }

        // Generate and hash password
        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save Device to DB
        const newDevice = new Device({
            deviceId,
            password: hashedPassword,
            location: null, // Location will be updated later
        });
        await newDevice.save();

        res.status(201).json({ message: "Device registered!", deviceId, password });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
