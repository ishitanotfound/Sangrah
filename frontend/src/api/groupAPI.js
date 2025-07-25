const baseURL = import.meta.env.VITE_BACKEND_URL;
import { getAuthHeader } from "./authHeader";
import axios from "axios";
axios.defaults.withCredentials = true;

// CREATE GROUP
export const createGroup = async (formData) => {
  try {
    const res = await axios.post(`${baseURL}/api/groups`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data', withCredentials: true
      },
    });
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};


// FETCH GROUPS
export const fetchGroups = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/groups`, {
      headers: getAuthHeader(), withCredentials: true
    });
    return res.data; // should return { message: ..., groups: {{_id, name,createdBy,members,groupPic,lists}} }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

// UPDATE GROUP
export const updateGroup = async (id, data) => {
  try {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.memberUsernames) formData.append('memberUsernames', data.memberUsernames);
    if (data.groupPic?.[0]) formData.append('groupPic', data.groupPic[0]); // 🧠 only send if file exists

    const res = await axios.put(`${baseURL}/api/groups/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data', withCredentials: true
      },
    });

    return res.data;
  } catch (error) {
    return { error: error.response?.data?.error || 'Something went wrong' };
  }
};

// DELETE GROUP
export const deleteGroup = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/groups/${id}`, {
      headers: getAuthHeader(), withCredentials: true
    });
    return res.data; // should return { message: ... }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" }; 
  }
}

// CREATE GROUP LIST
export const createGList = async (id, data) => {
  try {
    const res = await axios.post(`${baseURL}/api/groups/${id}`, data, {
      headers: getAuthHeader(), withCredentials: true
    });
    return res.data; // should return { message: ... , list : {_id, name, createdBy, group, fromDate, toDate}}
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" }; 
  }
}

// VIEW ALL GROUPS LIST
export const fetchGLists = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/api/groups/${id}`, {
      headers: getAuthHeader(), withCredentials: true
    });
    return res.data; // should return { message: ... , groupList : {{_id, name, createdBy, group, fromDate, toDate}} }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" }; 
  }
}