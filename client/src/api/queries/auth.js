import api from "../axiosClient";

const BASE = "/auth";

export async function fetchSession() {
  
  const raw = localStorage.getItem('session');
  if (!raw) {
    throw new Error('No session found in localStorage');
  }

  let stored;
  try {
    stored = JSON.parse(raw);
  } catch (e) {
    throw new Error('Malformed session in localStorage');
  }
  
  const { id } = stored;
  if (!id) {
    throw new Error('Stored session is missing an id');
  }
  
  try {
     
    const user = await api.get(`/users/${id}`);
    console.log(user)
    localStorage.setItem('session', JSON.stringify(user));
    return user;
  } catch (err) {
    console.error('fetchSession() failed:', err);
   
    localStorage.removeItem('session');
   
    throw err;
  }
}
 
export const registerUser = (data) => {
  console.log(data)

  return api.post(`${BASE}/register`, data);
};

export const loginUser = (data) => {
  console.log(data)
  
  return api.post(`${BASE}/login`, data);
};



export const logOut = () => {
  return api.post(`${BASE}/me/logout`);
};
