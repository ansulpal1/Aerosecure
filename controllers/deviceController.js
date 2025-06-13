import bcrypt from "bcrypt";
import Device from "../models/deviceModel.js";
import jwt from 'jsonwebtoken';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';

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
    const { deviceId, address, latitude, longitude, name, email, family_member, phone } = req.body;

    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ message: "Device not found!" });
    }

    device.location = { address, latitude, longitude };
    // Update additional fields if they are provided
    if (name) device.name = name;
    if (email) device.email = email;
    if (family_member) device.family_member = family_member;
    if (phone) device.phone = phone;
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



//login
export const loginDevice = async (req, res) => {
  const { identifier, password } = req.body;
  const query = identifier.includes("@")
    ? { email: identifier }
    : { deviceId: identifier };

  try {
    const device = await Device.findOne(query);
    if (!device) {
      return res.status(404).json({
        message: 'Device not found',
        success: false,
        error: true,
        data: null
      });
    }

    const isMatch = await bcrypt.compare(password, device.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
        success: false,
        error: true,
        data: null
      });
    }

    const accessToken = await generatedAccessToken(device._id);
    const refreshToken = await generatedRefreshToken(device._id);

    await Device.findByIdAndUpdate(device._id, {
      last_login_date: new Date().toISOString()
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };

    res.cookie('accessToken', accessToken, cookiesOption);
    res.cookie('refreshToken', refreshToken, cookiesOption);

    return res.json({
      message: 'Login Successfully',
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken
      },
      device  // Optional: so you can use `setUserDetails(response.data.device)`
    });

  } catch (err) {
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: true,
      data: null
    });
  }
};


//login device details
export const userDetailes = async (req, res) => {
  try {
    const deviceId = req.userId
    const device = await Device.findById(deviceId).select("-password")
    return res.json({
      message: 'Device details fetched successfully',
      error: false,
      success: true,
      data: device
    })

  } catch (error) {
    return res.status(500).json({
      message: "Something  is wrong",
      error: true,
      success: false
    })
  }
}

// update Password

export const changePassword = async (req, res) => {
  const userId = req.userId; // Make sure this is set via auth middleware
  const { currentPassword, newPassword } = req.body;

  try {
    // Basic validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ message: "Passwords must be strings." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }

    const user = await Device.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Defensive: ensure stored password is a string
    if (typeof user.password !== 'string') {
      console.error("Stored password is not a string:", user.password);
      return res.status(500).json({ message: "Password format error in database." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully.",
      error: false,
      success: true
    });

  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Update user/device details
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId; // Authenticated user ID
    const { deviceId, name, phone, email, family_member, address } = req.body;

    const device = await Device.findOne(deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found!", success: false, error: true });
    }

    // Only update fields that are provided
    if (name) device.name = name;
    if (email) device.email = email;
    if (phone) device.phone = phone;
    if (family_member) device.family_member = family_member;
    if (address && device.location) {
      device.location = {
        ...device.location,
        address,
      };
    }// Only if address is provided

    await device.save();

    return res.json({
      message: "User details updated successfully",
      success: true,
      error: false,
      data: device,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
}




