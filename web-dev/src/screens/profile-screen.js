import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WordCard from "../components/word-card";
import * as wordService from "../services/word-service";
import * as userService from "../services/user-service";
import { useParams } from "react-router-dom";

const ProfileScreen = () => {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  const [favorites, setFavorites] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(
    currentUser?.username || ""
  );
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedIsModerator, setUpdatedIsModerator] = useState(
    currentUser?.isModerator || false
  );

  const { username } = useParams();

  useEffect(() => {
    async function fetchFavoritesFromService() {
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
  }, [currentUser, username]);

  const handleUnSave = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
  };

  const handleDelete = (id) => {
    setFavorites(favorites.filter((w) => w._id !== id));
  };

  const handleUpdateInfo = async () => {
    try {
      await userService.updateUserInfo(currentUser.username, {
        username: updatedUsername,
        password: updatedPassword,
        isModerator: updatedIsModerator,
      });
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {currentUser && (
        <h1 className="--bs-body-color">
          Hello,&nbsp;
          <span className="text-primary">{currentUser?.username}</span>
        </h1>
      )}
      <br />
      <h4 style={{ textTransform: "capitalize" }} className="text-primary">
        {currentUser ? "My" : username + "'s "} Favorites
      </h4>
      {editMode && (
        <div>
          <input
            type="text"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="checkbox"
            checked={updatedIsModerator}
            onChange={(e) => setUpdatedIsModerator(e.target.checked)}
          />
          <label>Moderator</label>
          <button onClick={handleUpdateInfo}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
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
