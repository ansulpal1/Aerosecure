// UserProfile.jsx
import React from "react";
import { FaRegEdit, FaSignOutAlt, FaUserCircle, FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RiDashboardHorizontalFill, RiLockPasswordFill } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";

const UserProfile = () => {
    const user = useSelector((state) => state.user);
    const logout = () => {
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('refreshToken'); 
        localStorage.removeItem('userType'); 
        window.location.href = '/'; 
      };

      const userRole = localStorage.getItem("userType"); // "device" or "officer"
const dashboardRoute = userRole === "officer" ? "/dashboard" : "/userDashboard";
    return (
        <div className="h-full min-h-[31rem] w-full flex items-stretch bg-gray-100">
            <div className="flex flex-col md:flex-row w-full mt-5 ml-4 mr-4 bg-white shadow-2xl rounded-none md:rounded-xl overflow-hidden">
                {/* Sidebar */}
                <div className="bg-red-600 text-white p-8 flex flex-col items-center w-full md:w-1/4">
                    <FaUserCircle className="text-6xl mb-4" />
                    <h2 className="text-2xl font-bold">{user?.name || "John Doe"}</h2>
                    <p className="text-sm font-medium">{user?.email || "john@example.com"}</p>
                    {user?.deviceId ? (
  <p className="text-sm mt-1 font-medium">Device ID: {user.deviceId}</p>
) : user?.badgeNumber ? (
  <p className="text-sm mt-1 font-medium">Badge No: {user.badgeNumber}</p>
) : (
  <p className="text-sm mt-1 font-medium">ID: AERO-DEV-001</p>
)}


                    <Link to={dashboardRoute} className="mt-10 bg-white text-red-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition min-w-64 flex items-center justify-items-start gap-3">
                        <RiDashboardHorizontalFill
                        className="inline mr-2 ml-6" size={24} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="profile" className="mt-4 bg-white text-red-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition min-w-64 flex items-center justify-items-start gap-3">
                        <FaUserTie className="inline mr-2 ml-6" size={24} />
                        <span>Profile</span>
                    </Link>

                    <Link to="edit" className="mt-4 bg-white text-red-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition min-w-64 gap-3 flex items-center justify-items-start">
                        <FaRegEdit className="inline mr-2 ml-6" size={24} />
                        Edit Profile
                    </Link>
                    <Link to="changePassword" className="mt-4 bg-white text-red-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition min-w-64 gap-3 flex items-center justify-items-start">
                        <RiLockPasswordFill
                            className="inline mr-2 ml-6" size={24} />
                        Change Password
                    </Link>
                    <button  onClick={logout}className="mt-4  bg-white text-red-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition min-w-64 gap-3 flex items-center justify-items-start">
                        <FaSignOutAlt className="inline mr-2 ml-6" size={24} /> Logout
                    </button>



                </div>

                {/* Info Panel */}
                <div className="w-full md:w-3/4 p-8 bg-gray-50">
<Outlet/>
                </div>
                </div>
            </div>
            );
};

            export default UserProfile;
