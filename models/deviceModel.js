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
      mobile:{
        type:Number,
        default:null
      },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
