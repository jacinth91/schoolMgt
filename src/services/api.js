import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL, // Change this to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const request = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
    });

    // Extract token from cookies if available
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    return { data: response.data, token };
  } catch (error) {
    console.error("API Error:", error);
    throw error.response ? error.response.data : error;
  }
};

export const get = (endpoint) => request(endpoint, "GET", null);
export const post = (endpoint, data) => request(endpoint, "POST", data);
export const put = (endpoint, data) => request(endpoint, "PUT", data);
export const patch = (endpoint, data) => request(endpoint, "PATCH", data);
export const del = (endpoint) => request(endpoint, "DELETE", null);
