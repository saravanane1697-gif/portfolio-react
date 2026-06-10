import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "https://localhost:7090/api/projects";

export const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProject = async (project) => {
  const response = await axios.post(API_URL, project, authHeader());
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await axios.put(`${API_URL}/${id}`, project, authHeader());
  return response.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/${id}`, authHeader());
};
