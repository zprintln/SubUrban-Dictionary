import axios from "axios";
const SERVER_API_URL =
  process.env.NODE_SERVER_URL | "http://localhost:4000/api";
console.log("using auth API " + SERVER_API_URL);
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
  const response = await api.post(`${USERS_URL}/login`, {
    userName: username,
    password: password,
  });
  const user = response.data;
  return user;
};

export const logout = async () => {
  const response = await api.post(`${USERS_URL}/logout`);
  return response.data;
};

export const register = async ({ username, password, isModerator }) => {
  const response = await api.post(`${USERS_URL}/register`, {
    userName: username,
    password: password,
    moderator: isModerator,
  });
  return response.data;
};

export const profile = async () => {
  const response = await api.post(`${USERS_URL}/profile`);
  return response;
};
