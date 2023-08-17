import React from "react";
import { FaHome, FaSearch, FaRegComment, FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutThunk } from "../../services/user-reducer";
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

  const logout = async () => {
    dispatch(logoutThunk()).then(() => navigate("/home"));
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
      {active === "profile" && (
        <button
          style={{
            marginTop: 50,
            borderRadius: 50,
            backgroundColor: "#08B2E3",
            color: "white",
            border: "none",
            padding: 5,
            fontFamily: "Inter",
            fontSize: 20,
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
      )}
    </div>
  );
};
export default NavigationSidebar;
