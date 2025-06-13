// scripts/createSuperAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import SuperAdmin from './models/SuperAdmin.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    
    const hashedPassword = await bcrypt.hash('Pal@2002', 10);

    const superAdmin = new SuperAdmin({
      name: 'Ansul',
      email: 'palansul1@gmail.com',
      password: hashedPassword,
      role: 'superadmin'
    });

    await superAdmin.save();
    console.log('✅ Super Admin created successfully.');
    process.exit();
  } catch (error) {
    console.error('❌ Failed to create Super Admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();
