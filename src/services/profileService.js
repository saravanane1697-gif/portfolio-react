import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

export const getProfile = async () => {
  console.log("API_URL:", import.meta.env.VITE_API_URL);
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/profile/upload`, formData, {
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

  const response = await axios.post(
    `${API_URL}/profile/upload-resume`,
    formData,
    {
      headers: {
        ...authHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
