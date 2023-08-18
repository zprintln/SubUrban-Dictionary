import React from 'react';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  return (
    <div>
      <h1>Hello {currentUser?.username}</h1>
      <h2 style={{ color: 'blue' }}>My Favorites</h2>
      {/* Put the fetchFavorites of the user here */}
    </div>
  );
};

export default ProfileScreen;
