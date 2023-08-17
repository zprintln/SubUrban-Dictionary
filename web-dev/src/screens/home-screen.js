import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { performSearch } from '../services/search-service';

const HomeScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
  
    return (
      <div className="row">
        <div className="col-11 position-relative">
          <input
            placeholder="Search a definition"
            className="form-control rounded-pill ps-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch
            className="fs-3 position-absolute"
            style={{ left: '25px', bottom: '3px' }}
            onClick={() => performSearch(searchTerm, setResults)} // Call with parameters
          />
        </div>
        {/* Render the search results */}
        <div>
          {results.map((result, index) => (
            <div key={index}>{result.definition}</div> 
          ))}
        </div>
        {/* Other content of the home screen */}
      </div>
    );
  };
  
  export default HomeScreen;
