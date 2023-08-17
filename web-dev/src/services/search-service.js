import axios from 'axios';

export const handleExplore = async () => {
  try {
    const response = await axios.get('/api/explore');
    return response.data; 
  } catch (error) {
    console.error('Error fetching explore posts:', error);
    throw new Error('Failed to fetch explore posts');
  }
};

export const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`/api/search?word=${searchTerm}`);
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