import axios from "axios";

const SERVER_API_URL =
  process.env.NODE_SERVER_URL || "http://localhost:4000/api";

export const handleHome = async () => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/home`);
    return response.data;
  } catch (error) {
    console.error("Error fetching home posts:", error);
    throw new Error("Failed to fetch home posts");
  }
};

export const handleSearch = async (searchTerm) => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/search?word=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw new Error("Failed to search posts");
  }
};
