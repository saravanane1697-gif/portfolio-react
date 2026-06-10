import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "https://localhost:7090/api/contact";

export const sendMessage = async (messageData) => {
  const response = await axios.post(API_URL, messageData);
  return response.data;
};

export const getMessages = async () => {
  const response = await axios.get(API_URL, authHeader());

  return response.data;
};

export const markAsRead = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/mark-read`,
    {},
    authHeader(),
  );

  return response.data;
};

export const deleteMessage = async (id) => {
  await axios.delete(`${API_URL}/${id}`, authHeader());
};
