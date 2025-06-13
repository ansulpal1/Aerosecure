import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from "../utils/Axios";
const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Clear previous errors
      setError("");
      
      // Validate inputs
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("All fields are required");
      }
  
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
  
      if (newPassword === currentPassword) {
        throw new Error("New password must be different from current password");
      }
  
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
  
      // Enhanced password strength validation
      const hasUpperCase = /[A-Z]/.test(newPassword);
      const hasLowerCase = /[a-z]/.test(newPassword);
      const hasNumber = /[0-9]/.test(newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      
      if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
        throw new Error("Password must contain uppercase, lowercase, number, and special character");
      }
  
      // Get token safely
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login again");
      }
  
      // API call
      const userType = localStorage.getItem("userType");
     if(userType==="officer"){

      const response = await Axios({
        ...SummaryApi.updatePassword,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          currentPassword,
          newPassword,
        },
        timeout: 10000, // 10 second timeout
      });
      console.log(response); 
      setResponse(response); 

     }else{

      const response = await Axios({
        ...SummaryApi.changePassword,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          currentPassword,
          newPassword,
        },
        timeout: 10000, // 10 second timeout
      });
      setResponse(response); 
      console.log(response); 

     }

      
      
  
      if (!response.data.success) {
        throw new Error(response.data.message || "Password change failed");
      }
  
      // Success handling
      toast.success(response.data.message );
      setTimeout(() => {
        
      console.log(response)
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      }, 2000);
      
  
     
  
    } catch (error) {
        
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "An unexpected error occurred";
      
      setError(errorMessage);
      
      
      // Call your error notifier
      AxiosToastError(error);
      
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">🔒 Change Password</h1>

      {error && (
        <div className="mb-4 text-red-600 text-sm font-medium text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-9 text-xl text-gray-500"
          >
            {showCurrent ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-9 text-xl text-gray-500"
          >
            {showNew ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 text-xl text-gray-500"
          >
            {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold"
        >
          🔁 Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
