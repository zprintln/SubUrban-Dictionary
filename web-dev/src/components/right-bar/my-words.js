import { Link } from "react-router-dom";

export const MyWords = ({ words, username }) => {
  return (
    <div>
      <strong style={{ textTransform: "capitalize", fontSize: 22, color: "#134FE6" }}>
        {username ? username.replace("%20", " ") + "'s " : "My "}
          Words
      </strong>
      <div
        style={{
          marginTop: 10,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          paddingLeft: 50,
          paddingTop: 20,
          paddingBottom: 20,
          border: "1px solid #D9D9D9",
          overflow: "hidden",
          gap: 10,
        }}
      >
        {words.map((word) => (
          <Link style={{ textDecoration: "none", fontSize: 20}} key={word.word} to={`details/${word._id}`}>
            <strong
              style={{ fontSize: 30, color: "#134FE6" }}
            >
              {word.word}
            </strong>
          </Link>
        ))}
      </div>
    </div>
  );
};
