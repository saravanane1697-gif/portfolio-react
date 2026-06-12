import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (messageData) => {
  const response = await axios.post(`${API_URL}/contact`, messageData);
  return response.data;
};

export const getMessages = async () => {
  const response = await axios.get(`${API_URL}/contact`, authHeader());

  return response.data;
};

export const markAsRead = async (id) => {
  const response = await axios.put(
    `${API_URL}/contact/${id}/mark-read`,
    {},
    authHeader(),
  );

  return response.data;
};

export const deleteMessage = async (id) => {
  await axios.delete(`${API_URL}/contact/${id}`, authHeader());
};
