import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const redirectToSearchPage = () => {
        navigate('/search'); // Redirect to the search page 
      };
  
    return (
      <div className="row">
        <div className="col-11 position-relative">
          <input
            placeholder="Search a definition"
            className="form-control rounded-pill ps-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={redirectToSearchPage} // Redirect to the search page
          />
          <AiOutlineSearch
            className="fs-3 position-absolute"
            style={{ left: '25px', bottom: '3px' }}
            onClick={redirectToSearchPage} // Redirect to the search page
          />
        </div>
        {/* Other content of the home screen */}
      </div>
    );
  };
  
  export default HomeScreen;
