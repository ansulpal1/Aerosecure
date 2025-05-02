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
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🔑 Update Password After Login
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const officerId = req.user.id;

  try {
    const officer = await FireOfficer.findById(officerId);
    if (!officer) return res.status(404).json({ message: 'Fire Officer not found' });

    const isMatch = await bcrypt.compare(currentPassword, officer.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    officer.password = hashedPassword;
    await officer.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
