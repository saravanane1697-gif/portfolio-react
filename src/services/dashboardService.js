import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard/stats`, authHeader());

  return response.data;
};
