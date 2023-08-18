import axios from "axios";
const SERVER_API_URL =
  process.env.NODE_SERVER_URL || "http://localhost:4000/api";
const DEFINE_URL = `${SERVER_API_URL}/posts`;

export const defineWord = async (word) => {
  try {
    const response = await axios.post(`${DEFINE_URL}/create`, { word });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWordDefinition = async (wordId, user) => {
  try {
    const response = await axios.delete(
      `${SERVER_API_URL}/posts?id=${wordId}&user=${user}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const findMyWords = async (user) => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/my-posts?user=${user}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWordDetails = async (wordId) => {
  try {
    const response = await axios.get(
      `${SERVER_API_URL}/word-details?id=${wordId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFavorites = async (user) => {
  try {
    const response = await axios.get(
      `${SERVER_API_URL}/favorites?user=${user}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchIsSaved = async (id, user) => {
  try {
    const response = await axios.get(
      `${SERVER_API_URL}/favorites/is-saved?id=${id}&user=${user}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addFavoriteWord = async (id, user) => {
  try {
    const response = await axios.post(`${SERVER_API_URL}/favorites?id=${id}`, {
      user,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavoriteWord = async (id, user) => {
  try {
    const response = await axios.delete(
      `${SERVER_API_URL}/favorites?id=${id}&user=${user}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllWords = async () => { 
  try {
    const response = await axios.get(`${SERVER_API_URL}/home`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};