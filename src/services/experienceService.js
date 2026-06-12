import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

export const getExperiences = async () => {
  const response = await axios.get(`${API_URL}/experience`);
  return response.data;
};

export const createExperience = async (experience) => {
  const response = await axios.post(
    `${API_URL}/experience`,
    experience,
    authHeader(),
  );

  return response.data;
};

export const updateExperience = async (id, experience) => {
  const response = await axios.put(
    `${API_URL}/experience/${id}`,
    experience,
    authHeader(),
  );

  return response.data;
};

export const deleteExperience = async (id) => {
  await axios.delete(`${API_URL}/experience/${id}`, authHeader());
};
