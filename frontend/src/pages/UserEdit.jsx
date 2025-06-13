import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios.js"

const UserEdit = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    family_member: user?.family_member || "",
    address: user?.location?.address || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number
    if (name === 'phone') {
      // Only allow numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    
    // Special handling for family member
    if (name === 'family_member' && value.length > 20) {
      toast.error("Family member  should be less than 100 ");
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Validate phone number
    if (formData.phone.length != 10) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }
    
    // Validate family member
    if (formData.family_member.length > 2) {
      toast.error("Family member field should be less than 100 ");
      return false;
    }
    
    return true;
  };


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      
      const response=await Axios({
        ...SummaryApi.updateUser,
        data:formData
      })
      console.log(response)
  const {data:responseData}=response
 
  if(responseData.success){
    toast.success(response.data.message)
    const userData =await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }
  
  
     
  
    }catch(error){
      console.log(error)
      AxiosToastError(error)
    }
  
  
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md mt-4 sm:mt-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">✏️ Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Name and Email Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium sm:font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium sm:font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Family Member and Phone Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium sm:font-semibold">
              Family Member <span className="text-gray-500 text-sm">(max 20 characters)</span>
            </label>
            <input
              type="text"
              name="family_member"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={formData.family_member}
              onChange={handleChange}
              maxLength={20}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium sm:font-semibold">
              Mobile No. <span className="text-gray-500 text-sm">(10 digits)</span>
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </div>
        </div>

        {/* Address Row */}
        <div className="w-full">
          <label className="block mb-1 font-medium sm:font-semibold">Address</label>
          <input
            type="text"
            name="address"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate("/userProfile/profile")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;