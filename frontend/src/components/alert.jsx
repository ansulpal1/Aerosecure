import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSensorData as setSensorDataRedux } from "../store/sensorSlice"; // adjust path as needed
import { setAlarmActive } from "../store/sensorSlice"; // adjust path as needed
const Alert = ({ deviceId }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const ws = useRef(null);

  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const alarmActive = useSelector((state) => state.sensor.alarmActive);
  const SensorData = useSelector((state) => state.sensor.sensorData);


  useEffect(() => {
    ws.current = new WebSocket("ws://172.16.2.145:8080");

    ws.current.onopen = () => {
      console.log("🟢 WebSocket connected");
      ws.current.send(
        JSON.stringify({
          type: "register",
          role: "user",
          deviceId,
        })
      );
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "alert") {
          const data = message.sensorData;
          setSensorData(message.sensorData);
          dispatch(setSensorDataRedux(data)); // ✅ Store in Redux

          if (data.fire || data.status != "OK") {
            setShowAlert(true);

            playNotificationSound();

          }
        }
      } catch (error) {
        console.error("❌ Invalid WebSocket data", error);
      }
    };

    return () => ws.current?.close();
  }, [deviceId, dispatch]);





  const playNotificationSound = () => {
    audioRef.current = new Audio("/alert.wav");
    audioRef.current.loop = true; // repeat until stopped
    audioRef.current.play().catch((e) => console.log("🔇 Sound error", e));
    dispatch(setAlarmActive(true));
  };

  // ⛔ Stop sound
  const stopNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowAlert(false);
    dispatch(setAlarmActive(false));
  };
  useEffect(() => {
    if (!alarmActive || sensorData.status === "OK") {

      stopNotificationSound();
    }
  }, [alarmActive, sensorData]);
  useEffect(() => {
  if (SensorData?.status === "OK") {
    stopNotificationSound();
  }
}, [SensorData?.status]); // <-- This tells React to re-run when status changes





  return (
    <div className="p-1 text-white ">

      {/* 🔴 Real-time Sensor Data */}
      {sensorData ? (

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg flex justify-between">
            <span>🌡 Temperature</span>
            <span className={sensorData.temperature > 56 ? "text-red-500" : "text-green-400"}>{sensorData.temperature}°C</span>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg flex justify-between">
            <span>💧 Humidity</span>
            <span className="text-blue-400">{sensorData.humidity}%</span>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg flex justify-between">
            <span>🧪 Oxygen</span>
            <span className={sensorData.oxygen < 16 ? "text-red-500" : "text-green-400"}>
              {sensorData.oxygen}%
            </span>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg flex justify-between">
            <span>☠ CO</span>
            <span className={sensorData.co > 10 ? "text-red-500" : "text-green-400"}>{sensorData.co} ppm</span>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg flex justify-between">
            <span>💨 AQI</span>
            <span className={sensorData.aqi > 100 ? "text-red-500" : "text-green-400"}>{sensorData.aqi} ppm</span>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg flex justify-between">
            <span>🔥 Fire</span>
            <div className={sensorData.fire === 1 ? "text-red-500" : "text-green-400"}>
              {sensorData.status}

            </div>

          </div>
        </div>



      ) : (
        <p className="text-center font-bold">Waiting for sensor data...</p>
      )}

      {/* 🚨 Alert Popup */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-xl shadow-lg animate-bounce z-50">
          🚨 {sensorData?.status} Detected! Check your sensor data.
        </div>
      )}

      <div className=" justify-between grid grid-cols-2 gap-4">
        {/* 🧪 Test Button */}
        <button
          className="mt-6 p-3 bg-yellow-500 rounded-xl hover:bg-yellow-400 transition"
          onClick={() => {
            const simulatedData = {
              temperature: 85,
              gas: 650,
              fire: true,
            };
            setSensorData(simulatedData);
            setShowAlert(true);
            playNotificationSound();

          }}
        >
          🧪 Simulate Alert (Test)
        </button>
        <p

          className=" mt-6 p-3 bg-slate-600 rounded-xl hover:bg-yellow-400 transition text-center font-bold "

        >
          <span className={sensorData?.status == "ok" ? "text-red-400" : "text-green-400"}>✅{sensorData?.status}</span>
        </p>
      </div>
    </div>
  );

};

export default Alert;
