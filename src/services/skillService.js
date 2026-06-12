import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

export const getSkills = async () => {
  const response = await axios.get(`${API_URL}/skills`);
  return response.data;
};

export const createSkill = async (skill) => {
  const response = await axios.post(`${API_URL}/skills`, skill, authHeader());

  return response.data;
};

export const updateSkill = async (id, skill) => {
  const response = await axios.put(
    `${API_URL}/skills/${id}`,
    skill,
    authHeader(),
  );

  return response.data;
};

export const deleteSkill = async (id) => {
  await axios.delete(`${API_URL}/skills/${id}`, authHeader());
};
