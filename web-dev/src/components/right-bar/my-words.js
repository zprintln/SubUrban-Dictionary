import { Link } from "react-router-dom";

export const MyWords = ({ words }) => {
  return (
    <div>
      <strong style={{ fontFamily: "Inter", fontSize: 30, color: "#134FE6" }}>
        My Words
      </strong>
      <div
        style={{
          borderRadius: 50,
          display: "flex",
          flexDirection: "column",
          paddingLeft: 50,
          paddingTop: 20,
          paddingBottom: 20,
          border: "3px solid #D9D9D9",
          overflow: "hidden",
          gap: 10,
        }}
      >
        {words.map((word) => (
          <Link key={word.word} to={`details/${word._id}`}>
            <strong
              style={{ fontFamily: "Inter", fontSize: 30, color: "#134FE6" }}
            >
              {word.word}
            </strong>
          </Link>
        ))}
      </div>
    </div>
  );
};
