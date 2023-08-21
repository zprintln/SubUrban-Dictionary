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
        const favoriteWords = await wordService.fetchFavorites(currentUser.username);
        setFavorites(favoriteWords);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavoritesFromService();
  }, [currentUser, favorites]);

  return (
    <div>
      {currentUser && <h1 className="--bs-body-color">Hello,&nbsp;<span className="text-primary">{currentUser?.username}</span></h1> }
      <br />
      <h4 style={{textTransform: "capitalize"}}className="text-primary">{currentUser ? "My" : username + "'s "} Favorites</h4>
      {/* Map through the favorite words and render a WordCard component for each one */}
      {favorites.map((wordDetails) => (
        <WordCard
          key={wordDetails._id}
          wordDetails={wordDetails}
          showDeleteButton={false} 
          showSaveButton={true} 
        />
      ))}
    </div>
    
  );
};

export default ProfileScreen;
