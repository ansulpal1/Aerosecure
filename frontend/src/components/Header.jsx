import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react"; // Updated icon
import { useSelector } from "react-redux";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Provide a default value

useEffect(() => {
  setIsLoggedIn(!!user?._id);
}, [user]); // Add 'user' as a dependency if it's coming from props or context

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/fireLogo.png" width={55} height={60} className="rounded-full" alt="Aerosecure Logo" />
          <span className="text-2xl font-bold text-red-500">Aerosecure</span>
        </Link>

        {/* Navigation Links (Hidden on small screens) */}
        {/* <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-white hover:text-red-500 transition">
            Dashboard
          </Link>
          <Link to="/login" className="text-white hover:text-red-500 transition">
            How It Works
          </Link>
        </nav> */}

        {/* Profile or Login */}
        <div className="hidden md:flex items-center space-x-4 mr-5">
  {isLoggedIn ? (
    <Link to="/userProfile" className="flex items-center text-white hover:text-red-500 transition space-x-2">
      <img
        src="/boy.png"
        alt="Profile"
        className="w-12 h-12 rounded-full object-cover "
      />
      <span className="font-bold">Profile</span>
    </Link>
  ) : (
    <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
      Login
    </Link>
  )}
</div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Shown when menuOpen is true) */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 shadow-md p-4 space-y-2">
          <Link to="/dashboard" className="block text-white hover:text-red-500 transition">
            Dashboard
          </Link>
          <Link to="/login" className="block text-white hover:text-red-500 transition">
            How It Works
          </Link>
          {isLoggedIn ? (
            <Link to="/profile" className="block text-white hover:text-red-500 transition">
              👤 Profile
            </Link>
          ) : (
            <Link to="/login" className="block text-white hover:text-red-500 transition">
              🔐 Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
