// src/pages/FireOfficersPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const FireOfficersPage = () => {
  
  const [officers, setOfficers] = useState([]);
  const token = localStorage.getItem('superAdminToken');

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/superadmin/fireofficers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOfficers(res.data);
    } catch (error) {
      console.error('Failed to fetch officers:', error);
    }
  };

  const deleteOfficer = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API}/api/superadmin/fireofficers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOfficers();
    } catch (error) {
      console.error('Failed to delete officer:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Fire Officers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {officers.map((officer) => (
          <div
            key={officer._id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-2 ">
              <h3 className="text-xl font-semibold">{officer.name}</h3>
              <button onClick={() => deleteOfficer(officer._id)} >
                <Trash2 className="text-red-500 cursor-pointer hover:text-red-600" />
              </button>
            </div>
            <p><strong>Email:</strong> {officer.email}</p>
            <p><strong>User ID:</strong> {officer.
badgeNumber}</p>
            <p><strong>Phone:</strong> {officer.phone || 'N/A'}</p>
            <p><strong>Rank:</strong> {officer.rank || 'N/A'}</p>
            <p><strong>Status:</strong> {officer.isActive ? 'Active' : 'Inactive'}</p>
            <p><strong>Work Assigned:</strong> {officer.workAsigend}</p>
            <p><span className="font-medium">Joined On:</span> {new Date(officer.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FireOfficersPage;