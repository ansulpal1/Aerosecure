// src/pages/AddOfficerPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddOfficerPage = () => {
    const [form, setForm] = useState({
        name: '',
        badgeNumber: '',
        phone: '',
        email: '',
        rank: '',
    });

    const token = localStorage.getItem('superAdminToken');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loadingToast = toast.loading('Adding officer...');
            const { data } = await axios.post(
                `${import.meta.env.VITE_APP_API}/api/superadmin/fireofficer`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(data.message || 'Officer added successfully!', { id: loadingToast });
            setForm({ name: '', badgeNumber: '', phone: '', email: '', rank: '' });
        } catch (error) {
            toast.dismiss();

            if (error.response?.data?.message) {
                toast.error(`❌ ${error.response.data.message}`);

            }
            if (error.response?.data?.error) {
                toast.error(`❌ ${error.response.data.error}`);
            }
            else {
                toast.error('❌ Failed to add officer.');
            }
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Toaster position="top-right" />
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Fire Officer</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Badge Number</label>
                        <input
                            type="text"
                            name="badgeNumber"
                            value={form.badgeNumber}
                            onChange={handleChange}
                            placeholder="e.g., FD-1023"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Phone Number</label>
                        <input
                            type="number"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="e.g., 9876543210"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="officer@example.com"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Rank</label>
                        <input
                            type="text"
                            name="rank"
                            value={form.rank}
                            onChange={handleChange}
                            placeholder="e.g., Station Officer"

                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Add Officer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOfficerPage;
