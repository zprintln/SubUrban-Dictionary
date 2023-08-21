import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/home-screen";
import SearchScreen from "../screens/search-screen";
import LoginScreen from "../screens/login-screen";
import ProfileScreen from "../screens/profile-screen";
import DefineScreen from "../screens/define-screen";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DetailsScreen from "../screens/details-screen";

const Navigation = () => {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> 
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/search" element={<SearchScreen />} />
      {
        <Route
          path="/define"
          element={currentUser ? <DefineScreen /> : <LoginScreen />}
        />
      }
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/details/:id" element={<DetailsScreen />} />
    </Routes>
  );
};

export default Navigation;
