import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MdWarning } from "react-icons/md";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const fireIcon = new L.Icon({
  iconUrl: "/fireimg.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

const fireAlerts = [
  { id: 1, location: [28.6139, 77.2090], area: "New Delhi", message: "Fire near Connaught Place", status: "Active", time: "2025-02-21 14:30" },
  { id: 2, location: [19.0760, 72.8777], area: "Mumbai", message: "Warehouse Fire in Andheri", status: "Resolved", time: "2025-02-20 10:15" },
  { id: 3, location: [12.9716, 77.5946], area: "Bangalore", message: "Gas Leak at MG Road", status: "Active", time: "2025-02-19 08:45" },
  { id: 4, location: [30.858147, 75.860390], area: "Ludhiana", message: "Gas Leak at GNE College", status: "Active", time: "2025-02-18 12:00" },
];


const MapZoomController = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 17, { animate: true }); // Center and zoom in
  }
  return null;
};

const id = 4;
const Demo = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [satelliteView, setSatelliteView] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alert, setAlert] = useState([]);
  const lastAlertTimes = useRef({});
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
    console.log(userData.data)


  }
  useEffect(() => {
    fetchUser()

  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };
  const deviceId = alert.deviceId;

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.52.1:8080"); // Use your backend WebSocket URL

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "register", role: "officer", deviceId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAlerts(prev => [data, ...prev]);


    };

    return () => socket.close();
  }, []);

  useEffect(() => {
  const fetchNotification = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.notifi,
      });

      // ✅ Replace the entire state with fresh data
      setAlert(response?.data || []);
      console.log("Notification API response ap123:", response?.data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  // Call immediately on mount
  fetchNotification();

  // Set interval to call every 60 seconds
  const intervalId = setInterval(fetchNotification, 60000);

  // Cleanup
  return () => clearInterval(intervalId);
}, []);

  console.log("ff", alerts)
  console.log("Notification API response qqq:", alert);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Left Sidebar: Fire Notifications */}
      <div className="w-full md:w-1/3 p-4 bg-gray-800 text-white overflow-y-auto">
        {/* Header with Satellite View Toggle & Refresh Button */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-red-500">🔥 Alerts</h2>

          <div className="flex gap-2">
            {/* Toggle Satellite View Button */}
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-700 absolute top-2 right-2 z-20"
              onClick={() => setSatelliteView(!satelliteView)}
            >
              {satelliteView ? "🌍 Standard View" : "🛰 Satellite View"}
            </button>

            {/* Refresh Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              onClick={handleRefresh}
            >
              <MdRefresh className="text-xl" /> Refresh
            </button>
          </div>
        </div>
        <div>
          {alert.length === 0 ? (
            <p className="text-gray-500">No active alerts.</p>
          ) : (
            <div className="flex flex-col w-full text-left p-3 mb-2 bg-gray-700 hover:bg-gray-600 rounded-lg mt-2">

{alert.map((alert) => (
              <button
key={alert.deviceId}
                className="flex flex-col w-full text-left p-3 mb-2   border  rounded-lg shadow bg-white mt-2"
                onClick={() => setSelectedPosition([alert?.user?.location?.latitude, alert?.user?.location?.longitude])}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-red-600">🚨 Alert </h3>

                  <p className="text-black"><strong>🆔 Device:</strong> {alert?.deviceId}</p>
                </div>
                <p className="text-black"><strong>🕒 Time:</strong> {new Date(alert?.alertTime).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour12: true,
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}</p>
                <div className="flex justify-between">
                  <p className="text-black"><strong>🌡️ Adsress :</strong> {alert?.user?.location?.address}</p>
                  <p className="text-black"><strong>🔥 Case:</strong> {alert?.fireDetected ? 'Yes' : 'No'}</p>
                </div>
                <p className="text-black"><strong>📊 Status:</strong> {alert?.status || 'Unresolved'}</p>

              </button>
))}

            </div>
          )}
        </div>
        
        {/* Fire Alerts List */}
        {fireAlerts.map((alert) => (
          <button
            key={alert.id}
            className="flex flex-col w-full text-left p-3 mb-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            onClick={() => setSelectedPosition(alert.location)}
          >
            <div className="flex items-center gap-2">
              <MdWarning className="text-yellow-400 text-xl" /> {/* Alert Icon */}
              <div>
                <strong>{alert.area}</strong> - {alert.message}
              </div>
            </div>
            <div className="text-sm text-gray-300 mt-1">
              🕒 {alert.time} | {alert.status === "Active" ? "🔥 Active" : "✅ Resolved"}
            </div>
          </button>
        ))}
      </div>



      {/* Right Side: Interactive Map */}
      <div className="w-full md:w-2/3 h-screen relative z-10">


        <MapContainer
          center={[20.5937, 78.9629]} // Center on India
          zoom={5}
          className="h-full w-full"
          maxBounds={[
            [6, 67],  // Southwest corner (bottom-left)
            [37, 97], // Northeast corner (top-right)
          ]}
          maxBoundsViscosity={1.0} // Restrict dragging outside India
        >
          {/* Toggle Between Satellite and Standard View */}
          <TileLayer
            url={
              satelliteView
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://www.esri.com">Esri</a>'
          />
          {selectedPosition && <MapZoomController position={selectedPosition} />}
          {alert.map((alert) => (
            <Marker key={alert._id} position={[alert?.user?.location?.latitude, alert?.user?.location?.longitude]} icon={fireIcon}>
              <Popup>
                <strong>🚨Adsress:{alert?.user?.location?.address}</strong>
                <p>⚠️ {alert.message || "Fire" } </p>
                <p>✅<strong>Status:</strong> {alert.status}</p>
                <p>🕒<strong>Time:</strong> {alert.alertTime}</p>

                <Link to={`alert/${alert?.deviceId}`} > <strong>Get Details</strong> </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default Demo;
