import React, { useState } from "react";

const ForgotPassword = () => {
  const [role, setRole] = useState("user"); // "user" or "fire-officer"
  const [idOrEmail, setIdOrEmail] = useState("");

  const handleResetRequest = (e) => {
    e.preventDefault();
    // Handle reset logic here (API call)
    console.log(`Reset request for ${role}:`, idOrEmail);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4">
          Forgot Password
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              role === "user" ? "bg-red-600" : "bg-gray-700"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              role === "fire-officer" ? "bg-red-600" : "bg-gray-700"
            }`}
            onClick={() => setRole("fire-officer")}
          >
            Fire Dept
          </button>
        </div>

        {/* Input for Email or ID */}
        <form onSubmit={handleResetRequest} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm">
              {role === "user" ? "Registered Email" : "Sation Email"}
            </label>
            <input
              type="text"
              placeholder={role === "user" ? "Enter your email" : "Enter your Sation email"}
              value={idOrEmail}
              onChange={(e) => setIdOrEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Fire Officer Extra Message */}
          {role === "fire-officer" && (
            <p className="text-gray-400 text-sm mt-2">
              If you have forgotten your Password, Enter your sation email  otherwise please contact your Head of Sation.
            </p>
          )}

          {/* Submit Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-bold">
            Request Password Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
