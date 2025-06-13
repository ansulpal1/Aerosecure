import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useSelector } from "react-redux";

const fireIcon = new L.Icon({
  iconUrl: "/fireimg.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

const AlertDetails = () => {
  const { deviceId } = useParams();
  const [victimData, setVictimData] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [status, setStatus] = useState("Active");

  const user = useSelector((state) => state.user);
  console.log("detailalert", user);
  //select officer
  useEffect(() => {
    const fetchOfficers = async () => {
      const response = await Axios({
        ...SummaryApi.unassignedOfficer,

      })
      setOfficers(response.data.data);
      console.log(response.data.data);
    };

    fetchOfficers();
  }, [selectedOfficer]);

  useEffect(() => {
    setVictimData({
      name: "Rahul Sharma",
      address: "123 Street, Delhi, India",
      members: 4,
      aerosecureId: "AS-2025-001",
      mobile: "+91 9876543210",
      location: [28.7041, 77.1025],
    });


    const interval = setInterval(() => {
      setSensorData((prevData) => [
        ...prevData.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          temperature: (Math.random() * 10 + 30).toFixed(2),
          humidity: (Math.random() * 20 + 40).toFixed(2),
          oxygen: (Math.random() * 5 + 19).toFixed(2),
          carbonMonoxide: (Math.random() * 5).toFixed(2),
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [deviceId]);


  const handleAssignOfficer = async () => {
    if (!selectedOfficer) return alert("Please select an officer");

    try {
      const response = await Axios({
        ...SummaryApi.workAssignedToOfficer,
        data: { _id: selectedOfficer } // ✅ Add `data` key to send the request body

      });


      alert("Work assigned!");
      setSelectedOfficer("")
      console.log("✅ Response:", response.data);
    } catch (error) {
      console.error("❌ Error assigning work:", error);
      alert("Failed to assign work. Please try again.");
    }
  };


  const handleStatusChange = () => {
    setStatus("Resolved");
    alert("Status updated to Resolved");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">🚨 Fire Alert Details</h1>

      {/* First Row - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Victim Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center">👤 Victim Details</h2>
          {victimData && (
            <div className="space-y-3">
              {["Name", "Address", "Family Members", "Aerosecure ID", "Mobile"].map((label, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center">
                  <span className="font-semibold text-gray-300">{label}:</span>
                  <span className="text-white break-words">
                    {label === "Name" ? user.name :
                      label === "Address" ? user?.location?.address || "Gne" :
                        label === "Family Members" ? user.family_member || 5 :
                          label === "Aerosecure ID" ? <span className="text-red-300 font-mono">{victimData.aerosecureId}</span> :
                            <span className="text-green-400 font-semibold">{victimData.mobile}</span>}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sensor Data */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center">📊 Live Sensor Data</h2>
          {sensorData?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌡", label: "Temperature", value: `${sensorData[sensorData.length - 1].temperature}°C`, color: "text-red-400" },
                { icon: "💧", label: "Humidity", value: `${sensorData[sensorData.length - 1].humidity}%`, color: "text-blue-400" },
                { icon: "🧪", label: "Oxygen", value: `${sensorData[sensorData.length - 1].oxygen}%`, color: "text-green-400" },
                { icon: "☠", label: "CO", value: `${sensorData[sensorData.length - 1].carbonMonoxide} ppm`, color: "text-yellow-400" }
              ].map((sensor, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sensor.icon}</span>
                    <span className="text-gray-300 font-semibold">{sensor.label}</span>
                  </div>
                  <span className={`${sensor.color} font-bold text-lg`}>{sensor.value}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400 text-center">No sensor data available.</p>}
        </div>

        {/* Victim Location */}
        <div className="bg-gray-800 p-4 rounded-lg z-0">
          <h2 className="text-xl font-bold text-red-400 mb-4">📍 Location</h2>
          {victimData && (
            <MapContainer center={victimData.location} zoom={15} className="h-64 w-full rounded-lg">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={victimData.location} icon={fireIcon}>
                <Popup>{victimData.address}</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {/* Fire Officer Assignment */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-red-400 mb-4">👨‍🚒 Fire Officer Assignment</h2>
          <select
            className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
            onChange={(e) => {
              const selectedId = e.target.value;
              setSelectedOfficer(selectedId);

            }}
          >
            <option value="">Select Officer</option>
            {officers.map((officer) => (
              <option key={officer._id} value={officer._id}>{officer.name}</option>
            ))}
          </select>
          <button className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded-lg mb-4" onClick={handleAssignOfficer}>Assign Officer</button>
          <button className="w-full bg-green-600 hover:bg-green-500 p-2 rounded-lg" onClick={handleStatusChange}>
            {status === "Active" ? "Mark as Resolved" : "Resolved"}
          </button>
        </div>

        {/* Sensor Data Chart */}
        <div className="bg-gray-800 p-4 rounded-lg col-span-2 min-w-0">
          <h2 className="text-xl font-bold text-red-400 mb-4">📊 Live Sensor Data</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#ff0000" />
              <Line type="monotone" dataKey="humidity" stroke="#00ff00" />
              <Line type="monotone" dataKey="oxygen" stroke="#0000ff" />
              <Line type="monotone" dataKey="carbonMonoxide" stroke="#ffa500" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AlertDetails;
