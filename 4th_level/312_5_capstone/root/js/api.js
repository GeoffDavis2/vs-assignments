import axios from "axios";

export const apiGetAll = (endpoint) => {
  return axios.get(endpoint);
};

export const apiPost = (endpoint, thing) => {
  return axios.post(endpoint, thing);
};

export const apiDelete = (endpoint, id) => {
  return axios.delete(`${endpoint}/${id}`);
};

export const apiPut = (endpoint, id, data) => {
  return axios.put(`${endpoint}/${id}`, data);
};