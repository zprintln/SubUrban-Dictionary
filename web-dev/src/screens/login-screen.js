import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { loginThunk, registerThunk } from '../services/user-reducer'; 
import logoImage from '../images/logo.png';
import './login-screen.css'

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModerator, setIsModerator] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginThunk({ username, password }));
  };

  const handleRegister = () => {
    dispatch(registerThunk({ username, password, isModerator }));
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card p-4 shadow">
        <div className="text-center mb-4">
              <img
                src={logoImage} 
                alt="Logo"
                className="img-fluid logo-image"
              />
            </div>
            <h1 className="text-center mb-4">Please sign in to post new definitions!</h1>
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
