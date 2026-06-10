import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "https://localhost:7090/api/dashboard";

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, authHeader());

  return response.data;
};
