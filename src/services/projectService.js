import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = import.meta.env.VITE_API_URL;

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await axios.post(
    `${API_URL}/projects`,
    project,
    authHeader(),
  );
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await axios.put(
    `${API_URL}/projects/${id}`,
    project,
    authHeader(),
  );
  return response.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/projects/${id}`, authHeader());
};
