import React, { useEffect, useState } from "react";
import { FaHome, FaSearch, FaRegComment, FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutThunk, updateUserThunk } from "../../services/user-reducer";
import * as userService from "../../services/user-service";

const NavigationSidebar = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line
  const [ignore, active] = pathname.split("/");
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  const links = [
    { text: "home", icon: <FaHome />, display: () => true },
    { text: "search", icon: <FaSearch />, display: () => true },
    { text: "define", icon: <FaRegComment />, display: () => true },
    { text: "login", icon: <FiLogIn />, display: () => !currentUser },
    { text: "profile", icon: <FaUser />, display: () => currentUser },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedUsername, setUpdatedUsername] = useState(
    currentUser?.username || ""
  );
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedIsModerator, setUpdatedIsModerator] = useState(
    currentUser?.isModerator || false
  );
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    setDisabledButton(!isChangeMade());
  }, [updatedUsername, updatedPassword, updatedIsModerator]);

  const logout = async () => {
    dispatch(logoutThunk()).then(() => navigate("/home"));
  };

  const handleUpdateInfo = async () => {
    try {
      dispatch(
        updateUserThunk({
          username: currentUser.username,
          credentials: {
            username: updatedUsername,
            password: updatedPassword,
            moderator: updatedIsModerator,
          },
        })
      ).then(() => setDisabledButton(true));
    } catch (error) {
      console.log(error);
    }
  };

  const isChangeMade = () => {
    if (!currentUser) return false;
    return !(
      currentUser.username === updatedUsername &&
      currentUser.password === updatedPassword &&
      currentUser.moderator === updatedIsModerator
    );
  };

  return (
    <div className="list-group">
      {links
        .filter((link) => link.display())
        .map((link) => (
          <Link
            key={link.text}
            to={link.text}
            className={`list-group-item text-capitalize ${
              active === link.text ? "active" : ""
            }`}
          >
            {link.icon} {link.text}
          </Link>
        ))}
      {active === "profile" && currentUser && (
        <div>
          <div>
            <label className="form-label mt-2">Username</label>
            <input
              type="text"
              className="form-control"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              placeholder="Username"
            />

            <label className="form-label mt-2">Password</label>
            <input
              type="password"
              className="form-control"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
              placeholder="New Password"
            ></input>

            <label className="form-label mt-2">Moderator &nbsp;</label>
            <input
              type="checkbox"
              checked={updatedIsModerator}
              onChange={(e) => setUpdatedIsModerator(e.target.checked)}
            />

            <br />
            <button
              class="btn btn-primary"
              onClick={handleUpdateInfo}
              disabled={disabledButton}
            >
              Save
            </button>
          </div>
          <button
            style={{
              marginTop: 50,
              borderRadius: 50,
              backgroundColor: "#08B2E3",
              color: "white",
              border: "none",
              padding: 5,
              fontSize: 20,
              width: "100%",
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
            to={"/define"}
            onMouseEnter={(event) =>
              (event.target.style.backgroundColor = "#07A3D0")
            }
            onMouseLeave={(event) =>
              (event.target.style.backgroundColor = "#08B2E3")
            }
            onClick={logout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
export default NavigationSidebar;
