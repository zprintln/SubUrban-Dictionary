import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WordCard from "../components/word-card";
import * as wordService from "../services/word-service";

const ProfileScreen = () => {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavoritesFromService() {
      try {
        const favoriteWords = await wordService.fetchFavorites(
          currentUser.username
        );
        setFavorites(favoriteWords);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavoritesFromService();
  }, [currentUser]);

  const handleUnSave = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
  };

  return (
    <div>
      <h1 style={{ color: "blue" }}>Hello {currentUser?.username}</h1>
      <h2 style={{ color: "blue" }}>My Favorites</h2>
      {/* Map through the favorite words and render a WordCard component for each one */}
      {favorites.map((wordDetails) => (
        <WordCard
          key={wordDetails._id}
          wordDetails={wordDetails}
          showDeleteButton={false}
          showSaveButton={true}
          onUnSave={handleUnSave}
        />
      ))}
    </div>
  );
};

export default ProfileScreen;
