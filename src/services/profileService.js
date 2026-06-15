import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

// e.g. https://portfolio-api-e6f9.onrender.com
// Used to resolve relative paths like imageUrl and resumeUrl
export const API_BASE = API_URL.replace("/api", "");

export const getProfile = async () => {
  console.log("API_URL:", API_URL);
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/profile/upload`, formData, {
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
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
