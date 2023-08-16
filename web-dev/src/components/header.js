import { React } from "react";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#32DE8A",
        width: "100%",
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: 'white', textShadow: '0 4px 4px black' }}>Sub-Urban Dictionary</h1>
    </div>
  );
};

export default Header;
