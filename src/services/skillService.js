import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "https://localhost:7090/api/skills";

export const getSkills = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSkill = async (skill) => {
  const response = await axios.post(API_URL, skill, authHeader());

  return response.data;
};

export const updateSkill = async (id, skill) => {
  const response = await axios.put(`${API_URL}/${id}`, skill, authHeader());

  return response.data;
};

export const deleteSkill = async (id) => {
  await axios.delete(`${API_URL}/${id}`, authHeader());
};
