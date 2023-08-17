import axios from "axios";
const SERVER_API_URL =
  process.env.NODE_SERVER_URL || "http://localhost:4000/api";
console.log("using auth API " + SERVER_API_URL);
const DEFINE_URL = `${SERVER_API_URL}/define`;
const HOME_URL = `${SERVER_API_URL}/home`;

const api = axios.create({ withCredentials: true });

export const defineWord = async (word) => {
  try {
    const response = await api.post(DEFINE_URL, { word });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWordDefinition = async (wordId) => {
  try {
    const response = await api.delete(`${HOME_URL}/${wordId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const findMyWords = async (user) => {
  try {
    const response = await api.get(`${SERVER_API_URL}/my-posts?user=${user}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
