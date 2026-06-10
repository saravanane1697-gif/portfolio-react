import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "https://localhost:7090/api/profile";

export const getProfile = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      ...authHeader().headers, // Bearer token
      "Content-Type": "multipart/form-data", // Required for file upload
    },
  });

  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/upload-resume`, formData, {
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
