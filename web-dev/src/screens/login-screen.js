import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../services/user-reducer";
import logoImage from "../assets/icon.jpg";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModerator, setIsModerator] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await dispatch(loginThunk({ username, password }))
      .then((response) => {
        if (!response.type.includes("rejected")) {
          navigate("/profile");
        } else {
          throw new Error("Failed to log in. Please check your credentials.")
        }
      })
      .catch((error) => alert(error));
  };

  const handleRegister = async () => {
    await dispatch(registerThunk({ username, password, isModerator }))
      .then((response) => {
        if (!response.type.includes("rejected")) {
          navigate("/profile");
        } else {
          throw new Error("Failed to register. Your username is not unique.")
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card p-4 shadow">
            <div className="text-center mb-4">
              <img src={logoImage} alt="Logo" className="img-fluid w-50" />
            </div>
            <h1 className="text-center mb-4">
              Please sign in to post new definitions!
            </h1>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isModerator}
                onChange={(e) => setIsModerator(e.target.checked)}
              />
              <label className="form-check-label">Moderator</label>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary rounded-pill"
                onClick={handleRegister}
              >
                Register
              </button>
              <button
                className="btn btn-info rounded-pill"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
