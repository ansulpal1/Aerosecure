import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: Object, default: null }, // Will store address + lat/lng
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
