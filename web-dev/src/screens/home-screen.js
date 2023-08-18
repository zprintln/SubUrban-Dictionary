import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WordCardList from '../components/word-card-list';
import mockData from '../data/home-data.json'; // Import the mock data


const HomeScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { currentUser } = useSelector((state) => state.user); 
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
        <div className="row mt-3">
          <WordCardList wordList={mockData} showDeleteButton={!!currentUser} showSaveButton={!!currentUser} />
        </div>
      </div>
    );
  };
  
  export default HomeScreen;
