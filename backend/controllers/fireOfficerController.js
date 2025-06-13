import FireOfficer from '../models/FireOfficer.js';
import { generateRandomPassword } from '../utils/passwordGenerator.js';
import { sendLoginDetailsEmail } from '../utils/sendEmail.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerFireOfficer = async (req, res) => {
  try {
    const { name, badgeNumber, phone, email, rank } = req.body;

    const existingOfficer = await FireOfficer.findOne({ email });
    if (existingOfficer) return res.status(400).json({ message: 'Email already exists' });

    const rawPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newOfficer = new FireOfficer({ name, badgeNumber, phone, email, password: hashedPassword, rank });
    await newOfficer.save();

    await sendLoginDetailsEmail(email, name, email, rawPassword);
    res.status(201).json({ message: 'Fire officer registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const getAllFireOfficers = async (req, res) => {
  try {
    const officers = await FireOfficer.find().select('-password');
    res.json(officers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch officers' });
  }
};

export const deleteFireOfficer = async (req, res) => {
  try {
    const { id } = req.params;
    await FireOfficer.findByIdAndDelete(id);
    res.json({ message: 'Fire officer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

// 🔐 Login Fire Officer
export const loginFireOfficer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const officer = await FireOfficer.findOne({ email });
    if (!officer) return res.status(404).json({ message: 'Fire Officer not found' });

    const isMatch = await bcrypt.compare(password, officer.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = await generatedAccessToken(officer._id);
const refreshToken = await generatedRefreshToken(officer._id);
const updateUser= await FireOfficer.findByIdAndUpdate(officer?._id,{
last_login_date: new Date().toISOString()
})

const cookiesOption ={
    httpOnly: true,
   
    secure: true,
    sameSite: 'None',
}
res.cookie('accessToken',accessToken,cookiesOption)
res.cookie('refreshToken',refreshToken,cookiesOption)

return res.json({message:'Login Successfully',
    error:false,
    success:true,
    data:{
        accessToken,
        refreshToken
    }
})
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
  })
  }
};

// 🔑 Update Password After Login
export const updatePassword = async (req, res) => {
  const userId = req.userId; // Make sure this is set via auth middleware
  const { currentPassword, newPassword } = req.body;

  try {
    // Basic validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required1." });
    }

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ message: "Passwords must be strings." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }

    const user = await FireOfficer.findById(userId);
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
//login device details
export const officerDetailes = async (req, res) => {
  try {
      const userId= req.userId
      const officer = await FireOfficer.findById(userId).select("-password")
      return res.json({
          message: 'Officer details fetched successfully',
          error: false,
          success: true,
          data:officer
      })

  }catch(error){
      return res.status(500).json({
          message: "Something  is wrong",
          error: true,
          success: false
      })
  }
}



// controllers/fireOfficerController.js
export const getUnassignedOfficers = async (req, res) => {
  try {
    const officers = await FireOfficer.find({ workAsigend: false }).select("_id name email");
    return res.json({
      message: "Unassigned officers fetched successfully",
      error: false,
      success: true,
      data: officers
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: true,
      success: false
    });
  }
};


// controllers/fireOfficerController.js
export const assignWorkToOfficer = async (req, res) => {
  try {
    const { _id } = req.body;

    const officer = await FireOfficer.findById(_id);
    if (!officer) {
      return res.status(404).json({
        message: "Officer not found",
        error: true,
        success: false
      });
    }

    officer.workAsigend = true;
    await officer.save();

    return res.json({
      message: "Work assigned successfully",
      error: false,
      success: true,
      data: officer
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error assigning work",
      error: true,
      success: false
    });
  }
};


