import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: Object, default: null }, // Will store address + lat/lng
    name: {
        type: String,
       default:null,
      },
      email: {
        type: String,
        default:null,
        
      },
      family_member:{
        type:Number,
        default:null
      },
      phone:{
        type:Number,
        default:null
      },
      last_login_date:{
        type: Date,
        default: Date.now,
      },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
