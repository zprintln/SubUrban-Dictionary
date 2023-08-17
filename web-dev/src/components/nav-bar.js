import React from "react";
import {
  FaHome,
  FaSearch,
  FaRegComment,
  FaUser,
} from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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
    </div>
  );
};
export default NavigationSidebar;

