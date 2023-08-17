import { Link } from "react-router-dom";

export const AddWord = () => {
  return (
    <div
      style={{
        borderRadius: 50,
        display: "flex",
        flexDirection: "column",
        padding: 30,
        border: "3px solid #D9D9D9",
        overflow: "hidden",
        marginBottom: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <strong style={{ fontFamily: "Inter", fontSize: 24 }}>
          SUB-URBAN DICTIONARY IS WRITTEN BY YOU
        </strong>
        <img
          src={require("../../assets/icon.jpg")}
          alt="Icon"
          className="img-fluid w-50"
          style={{ width: 227, height: 227 }}
        />
      </div>
      <Link
        style={{
          borderRadius: 50,
          backgroundColor: "#134FE6",
          color: "white",
          border: "none",
          padding: 20,
          fontFamily: "Inter",
          fontSize: 30,
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
        }}
        to={"/define"}
        onMouseEnter={(event) =>
          (event.target.style.backgroundColor = "#1043C1")
        }
        onMouseLeave={(event) =>
          (event.target.style.backgroundColor = "#134FE6")
        }
      >
        + Define a Word
      </Link>
    </div>
  );
};
