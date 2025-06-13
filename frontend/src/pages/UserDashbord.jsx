import React, { useState, useEffect, useRef } from "react";
import{useNavigate} from "react-router-dom"
import { setAlarmActive } from "../store/sensorSlice"; // adjust path as needed
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

import Alert from "../components/alert";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const UserDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const SensorData = useSelector((state) => state.sensor.sensorData);
  const alarmActive = useSelector((state) => state.sensor.alarmActive);
  const [sensorData, setSensorData] = useState([]);
  const [sensorHistory, setSensorHistory] = useState([]);
  
  const userType = localStorage.getItem("userType");
  const [timer, setTimer] = useState(60);
  
  const [reason, setReason] = useState("");
  const [showStopPanel, setShowStopPanel] = useState(false);
const [showReasonDropdown, setShowReasonDropdown] = useState(false);
const [selectedReason, setSelectedReason] = useState("");
const [notified, setNotified] = useState(false);




  
  // 👉 Fetch current device info when component loads
  console.log(SensorData)
  const fetchUser =async()=>{
    const userData =await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
    console.log(userData.data)
    
   
    
  }
useEffect(()=>{
  fetchUser()

},[]);

useEffect(()=>{
  if(userType!="device"){
      navigate('/login')
 }
  },[])
  

useEffect(() => {
  if (!sensorData) return;

  const newData = {
    time: new Date().toLocaleTimeString(),
    temperature: SensorData?.temperature,
    humidity: SensorData?.humidity,
    oxygen: SensorData?.oxygen,
    carbonMonoxide: SensorData?.co,
  };

  setSensorHistory((prevData) => [...prevData.slice(-19), newData]); // Keep last 20 points

}, [SensorData]);

console.log(alarmActive);
  useEffect(() => {
    if (alarmActive) {
      setShowStopPanel(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowStopPanel(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [alarmActive]);

  useEffect(() => {
  if (showStopPanel && timer > 0) {
    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }

  
}, [showStopPanel, timer]);


  

  const handleConfirmStop = () => {
  // Stop alarm sound via Redux
  dispatch(setAlarmActive(false));

  // You can log or send the reason to the backend
  console.log("Alarm stopped. Reason:", selectedReason);

  // Reset all
  setShowStopPanel(false);
  setShowReasonDropdown(false);
  setSelectedReason("");
  setTimer(60);
};


const deviceId=user?.deviceId;
const id=user?._id;
console.log("h1",deviceId);
const notifyFireDepartment = async () => {
  try {
    const response = await Axios({
      method: "POST", // ✅ Required
      url: "http://localhost:8080/api/record/create", // Replace with your API URL
      headers: {
        "Content-Type": "application/json"
      },
      
        data:{
          deviceId: deviceId,
        user: id,
        isActive: "true",
        }
      
    });

    if (response.status === 201) {
      console.log("🚨 Notification sent to fire department.");
    } else {
      console.error("❌ Notification failed with status:", response.status);
    }
  } catch (error) {
    console.error("⚠️ Error notifying fire department:", error);
  }
};


useEffect(() => {
  if (timer <= 1 && !notified) {
     notifyFireDepartment();
    setNotified(true);
  }
 
}, []);
useEffect(() => {
  if (SensorData?.status==="OK") {
     handleConfirmStop()
  }
 
},);




  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      <div className="grid grid-cols-2 gap-6">
        {/* Sensor Data */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4">📊 Live Sensor Data</h2>
           
          <Alert deviceId={user.deviceId} /> 
        </div>

        {/* Alarm Control Panel */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4">🔔 Aerosecure Module Control</h2>
          
{!showStopPanel ? (
  // ✅ Normal State: All is Well
  <div className="flex justify-center items-center h-72">
    <div className="bg-green-100 text-green-800 px-6 py-8 rounded-xl text-center shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">✅ All Systems Normal</h2>
      <p className="text-sm text-gray-600">No active alerts at the moment.</p>
    </div>
  </div>
) : timer<1? (
  // ⏱ Time's Up: Fire Department Notified
  <div className="flex justify-center items-center min-h-[300px]">
    <div className="bg-red-50 border border-red-300 p-6 rounded-xl w-full max-w-lg shadow-lg text-center animate-pulse">
      <h2 className="text-2xl font-bold text-red-600 mb-2">🚨 Emergency Escalated</h2>
      <p className="text-gray-700 mb-4">
        The alarm was not stopped in time. Device has alerted the fire department. They are responding.
      </p>

      <div className="bg-white p-4 border border-gray-200 rounded-lg text-left text-sm mb-4">
        <p className="text-black"><strong>📍 Device ID:</strong> {user.deviceId}</p>
       
        
      </div>

      <p className="text-gray-700 mb-2">Still want to stop the alarm manually?</p>

      <button
        onClick={() => setShowReasonDropdown(true)}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mb-3"
      >
        🚫 Stop Anyway
      </button>

      <p className="text-gray-600 text-sm">📞 For emergency, call: <a href="tel:101" className="text-blue-600 underline">101</a></p>
    </div>
  </div>
): timer>0? (
  // 🔴 Alarm Panel with Countdown
  <div className="bg-white p-6 shadow-xl rounded-xl w-full max-w-lg mx-auto">
    <p className="font-bold text-red-600 mb-4 text-center text-lg">🚨 Alarm Active!</p>

    <div className="flex flex-col items-center mb-6">
      <div className="text-xs text-gray-500  mb-2 font-bold">Stop within</div>
      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
        <svg className="absolute w-full h-full">
          <circle
            className="text-gray-300"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="36"
            cx="48"
            cy="48"
          />
          <circle
            className="text-red-600 transition-all duration-500"
            strokeWidth="8"
            strokeDasharray="226"
            strokeDashoffset={(226 * (60 - timer)) / 60}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="36"
            cx="48"
            cy="48"
          />
        </svg>
        <div className="text-2xl font-bold text-red-600">{timer}s</div>
      </div>
    </div>

    {!showReasonDropdown ? (
      <button
        onClick={() => setShowReasonDropdown(true)}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-red-700 transition"
      >
        Stop Alarm
      </button>
    ) : (
      <div className="flex flex-col items-center gap-3">
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded focus:outline-none text-black"
        >
          <option value="">Select reason for false alarm</option>
          <option value="smoke from cooking">Smoke from cooking</option>
          <option value="sensor malfunction">Sensor malfunction</option>
          <option value="intentional test">Intentional test</option>
          <option value="other">Other</option>
        </select>

        <button
          onClick={handleConfirmStop}
          disabled={!selectedReason}
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-green-700 disabled:opacity-50 transition"
        >
          Confirm & Stop Alarm
        </button>
      </div>
    )}
  </div>
) :(<h1>NOthing</h1>)}


          

        </div>
      </div>

      {/* Sensor Data Graph */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">📈 Sensor Data Graph</h2>
      <ResponsiveContainer width="100%" height={300}>
  <LineChart
    data={sensorHistory}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
    <XAxis dataKey="time" stroke="#ccc" />
    <YAxis stroke="#ccc" />
    <Tooltip />

    {/* 🟡 Temperature */}
    <Line
      type="linear"
      dataKey="temperature"
      stroke="#ff3c3c"
      strokeWidth={2}
      dot={false}
      isAnimationActive={false}
    />

    {/* 🟢 Humidity */}
    <Line
      type="linear"
      dataKey="humidity"
      stroke="#00ff00"
      strokeWidth={2}
      dot={false}
      isAnimationActive={false}
    />

    {/* 🔵 Oxygen */}
    <Line
      type="linear"
      dataKey="oxygen"
      stroke="#00bfff"
      strokeWidth={2}
      dot={false}
      isAnimationActive={false}
    />

    {/* 🟠 CO */}
    <Line
      type="linear"
      dataKey="carbonMonoxide"
      stroke="#ffa500"
      strokeWidth={2}
      dot={false}
      isAnimationActive={false}
    />
  </LineChart>
</ResponsiveContainer>

      </div>

      
    </div>
    
  );
};

export default UserDashboard;
