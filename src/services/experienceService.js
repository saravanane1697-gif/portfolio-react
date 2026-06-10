import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "https://localhost:7090/api/experience";

export const getExperiences = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createExperience = async (experience) => {
  const response = await axios.post(API_URL, experience, authHeader());

  return response.data;
};

export const updateExperience = async (id, experience) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    experience,
    authHeader(),
  );

  return response.data;
};

export const deleteExperience = async (id) => {
  await axios.delete(`${API_URL}/${id}`, authHeader());
};
