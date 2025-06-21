import api from "../axiosClient";

const BASE = "/auth";

export const fetchSession = async () => {
  const response = await axiosClient.get(`/${base}/session`);
  localStorage.setItem("session", JSON.stringify(response.data?.data));
  return response.data?.data;
};

export const registerUser = (data) => {
  return api.post(`${BASE}/register`, data);
};

export const loginUser = (data) => {
  return api.post(`${BASE}/login`, data);
};

export const logOut = () => {
  return api.post(`${BASE}/me/logout`);
};
