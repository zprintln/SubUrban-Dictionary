import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WordCard from '../components/word-card'; 
import * as wordService from '../services/word-service'; 
import { useParams } from 'react-router-dom';

const ProfileScreen = () => {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  const [favorites, setFavorites] = useState([]);

  const {username} = useParams();

  useEffect(() => {
    async function fetchFavoritesFromService() {
      try {
        const favoriteWords = await wordService.fetchFavorites(username ? username : currentUser.username);
        setFavorites(favoriteWords);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavoritesFromService();
  }, [currentUser, username]);
  
  const handleUnSave = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
  };

  const handleDelete = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
  };

  return (
    <div>
      {currentUser && <h1 className="--bs-body-color">Hello,&nbsp;<span className="text-primary">{currentUser?.username}</span></h1> }
      <br />
      <h4 style={{textTransform: "capitalize"}}className="text-primary">{currentUser ? "My" : username + "'s "} Favorites</h4>
        {/* Conditional rendering if favorites exist */}
        {favorites.length > 0 ? (
        // Map through the favorite words and render WordCard components
        favorites.map((wordDetails) => (
          <WordCard
            key={wordDetails._id}
            wordDetails={wordDetails}
            showDeleteButton
            showSaveButton
            onUnSave={handleUnSave}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div>
          <br/>
          <h1 className="badge bg-info" style={{fontSize: "16px"}}>No saved definitions </h1>
        </div>
      )}
    </div>
    
  );
};

export default ProfileScreen;
