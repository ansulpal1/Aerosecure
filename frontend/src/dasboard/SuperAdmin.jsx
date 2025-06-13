import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <button
          className="bg-white shadow-md hover:shadow-xl p-6 rounded-2xl text-xl font-medium border border-gray-200 transition"
          onClick={() => navigate('/superadmin/officers')}
        >
          🔥 Fire Officers
        </button>
        <button
          className="bg-white shadow-md hover:shadow-xl p-6 rounded-2xl text-xl font-medium border border-gray-200 transition"
          onClick={() => navigate('/superadmin/devices')}
        >
          📦 Devices
        </button>
        <button
          className="bg-white shadow-md hover:shadow-xl p-6 rounded-2xl text-xl font-medium border border-gray-200 transition"
          onClick={() => navigate('/superadmin/add-officer')}
        >
          ➕ Add Officer
        </button>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
