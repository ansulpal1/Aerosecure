import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('superAdminToken');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/devices/alldevices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevices(res.data.devices || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">All Registered Devices</h2>

      {loading ? (
        <p className="text-lg text-gray-600">Loading devices...</p>
      ) : devices.length === 0 ? (
        <p className="text-lg text-gray-600">No devices found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((device) => (
            <div
              key={device._id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-700"><strong>AeroSecure-Id :</strong> {device.deviceId}</h3>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Status:</strong>{' '}
                  <span className="text-green-600 font-medium">Active</span>
                </p>
                <p>
                  <strong>Location:</strong>{' '}
                  {device.location && device.location.address
                    ? device.location.address
                    : 'Not Set'}
                </p>
                <p>
                  <strong>Latitude:</strong>{' '}
                  {device.location?.latitude || 'N/A'}
                </p>
                <p>
                  <strong>Longitude:</strong>{' '}
                  {device.location?.longitude || 'N/A'}
                </p>
                <p>
                  <strong>Registered At:</strong>{' '}
                  {new Date(device.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevicesPage;
