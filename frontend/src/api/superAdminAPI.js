import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_API}/api/superadmin`;

export const loginSuperAdmin = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};

