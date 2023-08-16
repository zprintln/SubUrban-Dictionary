import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/home-screen";
import SearchScreen from "../screens/search-screen";
import LoginScreen from "../screens/login-screen";
import ProfileScreen from "../screens/profile-screen";
import DefineScreen from "../screens/define-screen";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  return (
    <Routes>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route
        path="/define"
        element={currentUser ? <DefineScreen /> : <LoginScreen />}
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
};

export default Navigation;
