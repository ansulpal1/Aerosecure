import React from "react";
import { Link } from "react-router-dom";
import { PhoneCall, Facebook, Twitter, Linkedin } from "lucide-react"; // Icons for better UI

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section - Logo & Info */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-red-500">Aerosecure</h2>
          <p className="text-gray-400 mt-2">Ensuring Safety from Fire & Gas Leaks</p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="mt-4 md:mt-0 flex space-x-6">
          <Link to="/" className="text-gray-400 hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/services" className="text-gray-400 hover:text-red-500 transition">
            Services
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-red-500 transition">
            Contact
          </Link>
        </div>

        {/* Right Section - Emergency & Social Links */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <a href="tel:100" className="text-red-400 font-semibold flex items-center space-x-1 hover:text-red-500">
            <PhoneCall size={18} />
            <span>Police: 100</span>
            
          </a>
          <a href="tel:108" className="text-red-400 font-semibold flex items-center space-x-1 hover:text-red-500">
            <PhoneCall size={18} />
            <span>Ambulance: 108</span>
            
          </a>
          <div className="flex justify-center md:justify-end space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Developer Credit */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Developed by <span className="text-red-500 font-semibold">Ansul Pal</span>
      </div>
    </footer>
  );
};

export default Footer;
