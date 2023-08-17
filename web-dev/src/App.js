import NavigationSidebar from "./components/nav-bar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./services/user-reducer";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Navigation from "./components/navigation";
import DefineWord from "./components/define-word";

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
          <div className="col-7">
            <Navigation />
          </div>
          <div className="col-3"><DefineWord /></div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
