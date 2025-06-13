import mongoose from 'mongoose';

const fireIncidentSchema = new mongoose.Schema({
alertTime: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device', // Reference to the user who owns the Aerosecure device
    required: true
  },
  deviceId: {
    type: String,
    required: true // This helps trace which device sent the alert
  },
  
  assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FireOfficer',
    default: null
  },
  assignedAt: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Resolved'],
    default: 'Pending'
  },
  isActive: {
    type: Boolean,
    default: 'false',
    required:true
  },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const FireIncidentSchema = mongoose.model('FireIncident', fireIncidentSchema);
export default FireIncidentSchema;
