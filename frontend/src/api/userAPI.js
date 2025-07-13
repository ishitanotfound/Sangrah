const baseURL = "https://sangrah-backend.onrender.com";
import { getAuthHeader } from "./authHeader";
import axios from 'axios';

console.log("🧪 BACKEND URL:", import.meta.env.VITE_BACKEND_URL);

// SIGNUP
export const signUpUser = async (formData) => {
  const res = await fetch(`${baseURL}/api/users/signup`, {  // req bhej rhe h!
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return await res.json();
};

// LOGIN
export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${baseURL}/api/users/login`, formData);
    return res.data; // Axios wraps data in res.data
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

// FETCH PROFILE (uses token)
export const fetchProfile = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/account`, { headers : getAuthHeader() });
    return res.data; // { message: ..., user: { name, username, email... } }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

// UPDATE PROFILE
export const updateProfile = async (formData) => {
  try {
    const res = await axios.put(
      `${baseURL}/api/users/account`,
      formData,
      { headers: getAuthHeader() }
    );
    return res.data;
  } catch (error) {
    return {
      error: error.response?.data?.error || "Something went wrong",
    };
  }
};

// DELETE PROFILE
export const deleteProfile = async () => {
  try {
    const res = await axios.delete(`${baseURL}/api/users/account`, {
      headers: getAuthHeader(),
    });
    return res.data; // should return { message: ... }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};
