import axios from 'axios';

const SERVER_API_URL =
  process.env.NODE_SERVER_URL | "http://localhost:4000/api";

const SEARCH_URL = `${SERVER_API_URL}/search`;
const HOME_URL = `${SERVER_API_URL}/home`;


export const handleHome = async () => {
  try {
    const response = await axios.get(`${HOME_URL}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching home posts:', error);
    throw new Error('Failed to fetch home posts');
  }
};

export const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`${SEARCH_URL}?word=${searchTerm}`);
      return response.data;
    } catch (error) {
      console.error('Error searching posts:', error);
      throw new Error('Failed to search posts');
    }
  };
  
  export const performSearch = async (searchTerm, setResults) => {
    try {
      const searchResults = await handleSearch(searchTerm);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
