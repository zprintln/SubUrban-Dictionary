import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./services/user-reducer";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header.js";
import Navigation from "./components/navigation";
import RightComponent from "./components/right-bar/right-component";
import NavigationSidebar from "./components/left-bar/nav-bar";

const store = configureStore({
  reducer: { user: userReducer },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="row px-5 pt-3">
          <div className="col-2">
            <NavigationSidebar />
          </div>
          <div className="col-6">
            <Navigation />
          </div>
          <div className="col-4"><RightComponent /></div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
