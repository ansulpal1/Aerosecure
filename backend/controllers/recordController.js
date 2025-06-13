// controllers/fireIncidentController.js

import FireIncident from '../models/Record.js'; // Adjust path as needed

export const createFireIncident = async (req, res) => {
  try {
    const { isActive, deviceId, user } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, message: "Missing required fields: user and deviceId" });
    }

    const newIncident = new FireIncident({
      isActive,
      deviceId,
      user,
      alertTime: new Date(), // or req.body.alertTime if coming from sensor
    });

    await newIncident.save();

    res.status(201).json({
      success: true,
      message: 'Fire incident created successfully',
      data: newIncident
    });

  } catch (error) {
    console.error("Error creating fire incident:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating incident',
      error: error.message
    });
  }
};
export const getActiveDeviceIncidents = async (req, res) => {
  try {
    const incidents = await FireIncident.find()
      .populate({
        path: "user",
        model: "Device",
        select: "name deviceId isActive location", // optional: limit fields
      });

    // Filter only those where the populated user.isActive is true
    const activeDeviceIncidents = incidents.filter(
      (incident) => incident.isActive
    );

    res.status(200).json(activeDeviceIncidents);
  } catch (error) {
    console.error("Error fetching active incidents:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
