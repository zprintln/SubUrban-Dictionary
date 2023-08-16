import { Routes, Route } from "react-router";
import NavigationSidebar from "./components/nav-bar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./services/user-reducer";
import HomeScreen from "./screens/home-screen";
import SearchScreen from "./screens/search-screen";
import LoginScreen from "./screens/login-screen";
import ProfileScreen from "./screens/profile-screen";
import DefineScreen from "./screens/define-screen";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: { user: userReducer },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="row">
          <div className="col-2">
            <NavigationSidebar />
          </div>
          <div className="col-7">
            <Routes>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/define" element={<DefineScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
          </div>
          <div className="col-3">Something temp</div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
