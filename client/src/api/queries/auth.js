import api from "../axiosClient";

const base = "auth"

export const registerUser = (data)=>{
    return api.post(`/${base}/register`, data)
}

export const loginUser = (data) => {
  return api.post(`/${base}/login`, data);
};

export const logOut = () => {
  return api.post(`/${base}/me/logout`);
};