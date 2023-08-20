import { Link } from "react-router-dom";

export const AddWord = () => {
  return (
    <div 
      style={{
        borderRadius: 50,
        width: "350px",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        border: "1px solid #D9D9D9",
        overflow: "hidden",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          width: "320px",
          height: "150px",
          display: "flex",
          paddingBottom: "15px",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        <span style={{ marginLeft: "30px", paddingTop: "10px" }}><strong style={{ fontSize: 20 }}>
          SUB-URBAN DICTIONARY IS WRITTEN BY YOU
        </strong></span>
        <img
          src={require("../../assets/icon.jpg")}
          alt="Icon"
          className="img-fluid"
          style={{ width: 200, height: 200 }}
        />
      </div>
      <div style={{ marginLeft: "75px", marginRight: "50px", paddingTop: "10px" }}>
        <Link
          className="btn btn-primary"
          style={{
            borderRadius: 50,
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontFamily: "Inter",
            fontSize: 18,
            textDecoration: "none",
            justifyContent: "center",
          }}
          to={"/define"}
          onMouseEnter={(event) =>
            (event.target.style.backgroundColor = "#1043C1")
          }
          onMouseLeave={(event) =>
            (event.target.style.backgroundColor = "#0d6efd")
          }
        >
          + Define a Word
        </Link>
      </div>
    </div>
  );
};
