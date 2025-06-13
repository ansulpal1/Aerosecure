import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
  const userRole = localStorage.getItem("userType"); // "device" or "officer"
const dashboardRoute = userRole === "officer" ? "/dashboard" : "/userDashboard";

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center px-6"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?firefighter,fire')" }}>
        <div className="bg-black bg-opacity-70 p-8 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-red-500">
            Aerosecure: Advanced  Oxygen, Fire & Gas Leak Detection 🚒
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Smart Alerts | Rapid Response | 24/7 Protection | First-in-India Oxygen Depletion Detection
          </p>
          <Link to={dashboardRoute}
            className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
            🚨 View Live Dashboard
          </Link>
        </div>
      </section>
      

      {/* About Aerosecure */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-red-500">What is Aerosecure?</h2>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          Aerosecure is an <strong>AI-powered fire safety system that detects fire, gas leaks, and low oxygen levels</strong>. It <b>alerts users and emergency services in real time</b>, ensuring faster response and preventing disasters.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-800 px-6">
        <h2 className="text-3xl font-bold text-center text-red-500">How Aerosecure Works 🚒</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">📡 Smart Sensors</h3>
            <p className="text-gray-300 mt-2">
              Our <strong>ESP32-based system</strong> detects gas leaks, oxygen drops, and flames in real-time.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">🚨 Instant User Alerts</h3>
            <p className="text-gray-300 mt-2">
              Users receive <strong>app notifications, SMS, and calls</strong> for immediate action.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">🔥 Fire Dept Auto-Alert</h3>
            <p className="text-gray-300 mt-2">
              If the user does not respond, <strong>firefighters receive live data & location</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Oxygen Depletion & Safety Risks */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-red-500">⚠️ Oxygen Depletion & Carbon Monoxide Risk Detection</h2>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
        Aerosecure is the <strong>first system in India</strong> that detects <strong>oxygen depletion and CO poisoning risks</strong> from heaters, bonfires, and enclosed fires. These can cause <strong>hypoxia, asphyxiation, and even death</strong> if undetected.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">🫁 Oxygen Deficiency</h3>
            <p className="text-gray-300 mt-2">
              Detects when oxygen drops below <strong>19.5%</strong>, preventing hypoxia and asphyxiation.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">☠️ Carbon Monoxide Poisoning</h3>
            <p className="text-gray-300 mt-2">
              Alerts users to dangerous CO buildup due to incomplete combustion.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">🏠 Confined Space Hazard</h3>
            <p className="text-gray-300 mt-2">
              Ensures safety in enclosed areas where oxygen depletion can be fatal.
            </p>
          </div>
        </div>
      </section>
      <hr className="text-red-300"/>
      {/* Why Aerosecure is Better */}
      <section className="py-16  px-6 text-center">
        <h2 className="text-3xl font-bold text-red-500">Why Aerosecure is Better 🔥</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">⚡ Faster Than 911 Calls</h3>
            <p className="text-gray-300 mt-2">
              Traditional calls take time. Aerosecure <strong>automatically alerts emergency services</strong> with precise sensor data.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">📊 Live Monitoring</h3>
            <p className="text-gray-300 mt-2">
              Unlike traditional alarms, <strong>firefighters can monitor the risk level in real-time</strong>.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">🌍 Smart Automation</h3>
            <p className="text-gray-300 mt-2">
              The system <strong>activates fans, sirens, and emergency calls</strong> to prevent escalation.
            </p>
          </div>
        </div>
      </section>

      {/* Fire Department Collaboration */}
      <section className="py-16 bg-gray-800 text-center px-6">
        <h2 className="text-3xl font-bold text-red-500">🚒 Partnered with Fire Departments</h2>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          Aerosecure works closely with <strong>fire stations to improve emergency response times</strong>. Firefighters get <strong>live alerts</strong> and <strong>sensor data</strong> before arriving at the scene.
        </p>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 text-center px-6">
        <h2 className="text-3xl font-bold text-red-500">🚨 Need Help? Call Now!</h2>
        <p className="text-lg text-gray-300 mt-4">
          If you're facing an emergency, call our 24/7 helpline.
        </p>
        <a href="tel:101"
          className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
          📞 Call 101 Now
        </a>
      </section>
      <section>
      
     
      </section>
    </div>
  );
};

export default Home;
