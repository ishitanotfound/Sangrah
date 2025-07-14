const baseURL = import.meta.env.VITE_BACKEND_URL;
import { getAuthHeader } from "./authHeader";
import axios from "axios";

// CREATE LIST
export const createList = async (formData) => {
  try {
    const res = await axios.post(`${baseURL}/api/lists`, formData, {
      headers: getAuthHeader(),
    });
    return res.data; 
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

// VIEW LISTS
export const fetchLists = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/lists`, { headers : getAuthHeader() });
    return res.data; // { message: ..., lists: { name, toDate, fromDate... } }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

// UPDATE LIST
export const updateList = async (id, formData) => {
  try {
    const res = await axios.put(
      `${baseURL}/api/lists/${id}`,
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

// DELETE LIST
export const deleteList = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/lists/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data; // should return { message: ... }
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

// ADD TASK
export const createTask = async (id, newTask) => {
  try {
    const res = await axios.post(`${baseURL}/api/lists/${id}`, { newTask }, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    return {
      error: error.response?.data?.error || "Something went wrong",
    };
  }
};


// GET TASKS 
export const fetchTasks = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/api/lists/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong"}
  }
}

// UPDATE TASKS
export const updateTask = async (listId, taskIndex, data) => {
  try {
    const res = await axios.put(`${baseURL}/api/lists/${listId}/${taskIndex}`, data, { headers: getAuthHeader() });
    return res.data; // message, lists: { name, toDate, fromDate... } 
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong"}
  }
}

// DELETE TASKS
export const deleteTask = async (listId, taskIndex) => {
  try {
    const res = await axios.delete(`${baseURL}/api/lists/${listId}/${taskIndex}`, { headers: getAuthHeader() });
    return res.data; // message, lists: { name, toDate, fromDate... } 
  } catch (error) {
    return { error: error.response?.data?.error || "Something went wrong"}
  }
}