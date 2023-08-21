import { Link } from "react-router-dom";

export const MyWords = ({ words }) => {
  return (
    <div>
      <br/>
      <h4 className="text-primary">
        My Words 
      </h4>
      <div
        style={{
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
          <div>
            <Link style={{ textDecoration: "none", fontSize: 20}} key={word.word} to={`details/${word._id}`}>
                <b>{word.word}</b>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
