// UserProfile.jsx (UI Only)
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [lastLogin, setLastLogin] = useState(null);
    useEffect(() => {
        if (user?.last_login_date) {
          setLastLogin(new Date(user.last_login_date).toLocaleString()); // Convert to readable format
        }
      }, []);

    const logout = () => {
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('refreshToken'); 
        localStorage.removeItem('userType'); 
        window.location.href = '/'; 
    };

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md mt-4 sm:mt-10">
           
            {user?.deviceId ? (
   <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">👤 User Profile</h1>
) : user?.badgeNumber ? (
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">🚒 Fire Officer Profile</h1>
) : (
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">👤 User Profile</h1>
)}

            {/* User Info Section */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-full sm:w-2/3 space-y-3">
                    <p className="flex flex-col sm:flex-row gap-1">
                        <strong className="w-14">Name:</strong> 
                        <span className="font-medium">{user?.name}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row gap-1">
                        <strong className="w-14">Email:</strong> 
                        <span className="font-medium">{user?.email}</span>
                    </p>
                </div>
                <div className="w-full sm:w-1/3 space-y-3">
                    <p className="flex flex-col sm:flex-row gap-1">
                        <strong className="w-14">Mobile:</strong> 
                        <span className="font-medium">{user?.phone}</span>
                    </p>
                    

                    {user?.deviceId ? (
   <p className="flex flex-col sm:flex-row gap-1">
   <strong className="">Family Member:</strong> 
   <span className="font-medium">{user?.family_member}</span>
</p>
) : user?.badgeNumber ? (
    <p className="flex flex-col sm:flex-row gap-1">
                        <strong className="">Rank:</strong> 
                        <span className="font-medium">{user?.rank}</span>
                    </p>
) : (
    <p className="flex flex-col sm:flex-row gap-1">
    <strong className="">Family Member:</strong> 
    <span className="font-medium">{user?.family_member}</span>
</p>
)}
                </div>
            </div>

            {/* Linked Devices Section */}
            
            {user?.deviceId ? (
   <div className="mb-6">
   <h2 className="text-lg sm:text-xl font-semibold mb-3">🔗 Linked Aerosecure Devices</h2>
   <ul className="space-y-3">
       <li className="p-3 sm:p-4 bg-gray-100 rounded-lg">
           <div className="space-y-2">
               <p className="flex flex-col sm:flex-row gap-1">
                   <strong className="">Aerosecure ID:</strong> 
                   <span className="font-medium">{user?.deviceId}</span>
               </p>
               <p className="flex flex-col sm:flex-row gap-1">
                   <strong className="">Address:</strong> 
                   <span className="font-medium">{user?.location?.address}</span>
               </p>
               <p className="flex flex-col sm:flex-row gap-1">
                   <strong className="">Status:</strong>
                   <span className={`font-medium ${user?.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                       {user?.status || "Inactive"}
                   </span>
               </p>
           </div>
       </li>
   </ul>
</div>

) : user?.badgeNumber ? (
    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-full sm:w-2/3 space-y-3">
                    <p className="flex flex-col sm:flex-row gap-1">
                        <strong className="w-14">Name:</strong> 
                        <span className="font-medium">{user?.name}</span>
                    </p>
                   
                </div>
                <div className="w-full sm:w-1/3 space-y-3">
                    <p className="flex flex-col sm:flex-row gap-1">
                        <strong className="w-14">Mobile:</strong> 
                        <span className="font-medium">{user?.phone}</span>
                    </p>
                
                    
                </div>
            </div>
) : (
    null
)}

            {/* Footer Actions */}

            {user?.deviceId ? (
   <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
   <p className="text-sm sm:text-base">
       <strong>Last Login:</strong> {lastLogin}
   </p>
   <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
       <Link 
           to="/userProfile/edit"
           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
       >
           ✏️ Edit Profile
       </Link>
       <button 
           onClick={logout}
           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
       >
           🚪 Logout
       </button>
   </div>
</div>
) : user?.badgeNumber ? (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <p className="text-sm sm:text-base">
                    <strong>Last Login:</strong> {lastLogin}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                   
                    <button 
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
) : (
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">👤 User Profile</h1>
)}
            
        </div>
    );
};

export default Profile;