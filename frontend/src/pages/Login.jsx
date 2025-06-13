import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from 'react-redux';
import {setUserDetails} from '../store/userSlice.js'
import AxiosToastError from '../utils/AxiosToastError';
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails.js";

const Login = () => {
  const dispatch= useDispatch()
  const [rank, setRank] = useState("user"); // "user" or "fire-officer"
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (rank === "fire-officer") {
        const response= await axios.post("http://localhost:8080/api/fireofficer/login", {
          email: identifier,
          password,
        });
        toast.success(response.data.message);
if(response.data.error){
  toast.error(response.data.message)}

        // Store token if needed
        localStorage.setItem('accessToken',response.data.data.accessToken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        localStorage.setItem("userType", "officer"); // Fire Officer Dashboard
        const userDetails = await fetchUserDetails()
    dispatch(setUserDetails(userDetails.data))
    setTimeout(() => {
      navigate("/Dashboard");
    }, 1500);
        
      } else {
        const response = await axios.post("http://localhost:8080/api/devices/login", {
          identifier,
          password,
        });
        toast.success(response.data.message);
        if(response.data.error){
          toast.error(response.data.message)}
        // Store token if needed
        localStorage.setItem('accessToken',response.data.data.accessToken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken) // for user
        localStorage.setItem("userType", "device");
        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))
        setTimeout(() => {
          navigate("/userDashboard");
        }, 1500); // User Dashboard
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
      AxiosToastError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4">
          {rank === "user" ? "User Login" : "Fire Department Login"}
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg ${rank === "user" ? "bg-red-600" : "bg-gray-700"}`}
            onClick={() => setRank("user")}
          >
            User
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${rank === "fire-officer" ? "bg-red-600" : "bg-gray-700"}`}
            onClick={() => setRank("fire-officer")}
          >
            Fire Dept
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-400 text-sm mb-2 text-center">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm">
              {rank === "user" ? "Email Address / DeviceId" : "Fire Officer email"}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={rank === "user" ? "Enter your email / deviceId" : "Enter your email"}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-bold"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400">
          <Link to="/forgot-password" className="hover:text-red-500">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
