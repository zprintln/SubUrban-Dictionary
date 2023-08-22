import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WordCard from "../components/word-card";
import * as wordService from "../services/word-service";
import { useNavigate, useParams } from "react-router-dom";

const ProfileScreen = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (username === currentUser?.username) {
      navigate("/profile");
      return;
    }

    async function fetchFavoritesFromService() {
      // Check if the current user exists and has an _id property
      try {
        const favoriteWords = await wordService.fetchFavorites(
          username ? username : currentUser.username
        );
        setFavorites(favoriteWords);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavoritesFromService();
  }, [currentUser, username, navigate]);

  const handleUnSave = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
  };

  const handleDelete = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
    navigate(`/profile/${currentUser.username}`);
  };

  return (
    <div>
      {currentUser && !username && (
        <h1 className="--bs-body-color">
          Hello,&nbsp;
          <span className="text-primary">{currentUser.username}</span>
        </h1>
      )}
      {username && (
        <h1 className="--bs-body-color">
          <span className="text-primary">{username}'s</span> Profile
        </h1>
      )}
      <br />
      <h4 className="text-primary">
        {username ? username + "'s " : "My"} Favorites
      </h4>
      {/* Conditional rendering if favorites exist */}
      {favorites.length > 0 ? (
        // Map through the favorite words and render WordCard components
        favorites.map((wordDetails) => (
          <div>
            <WordCard 
              key={wordDetails._id}
              wordDetails={wordDetails}
              showDeleteButton
              showSaveButton
              onUnSave={handleUnSave}
              onDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <div>
          <br />
          <h1 className="badge bg-info" style={{ fontSize: "16px" }}>
            No saved definitions{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
