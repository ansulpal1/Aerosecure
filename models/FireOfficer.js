import mongoose from 'mongoose';

const fireOfficerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    badgeNumber: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        default:'Fire Officer',
    },
    isActive:{
        type:String,
        default:'false',

    },
    workAsigend:{
        type:String,
        default:'false',

    },
    last_login_date:{
        type: Date,
        default: Date.now,
      },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const FireOfficer = mongoose.model('FireOfficer', fireOfficerSchema);
export default FireOfficer;
