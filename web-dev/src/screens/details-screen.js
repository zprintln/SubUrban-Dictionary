import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WordCard from "./../components/word-card";
import { fetchWordDetailsThunk } from "../services/word-reducer";

const DetailsScreen = () => {
  const { id } = useParams();
  const [wordDetails, setWordDetails] = useState(null);

  useEffect(() => {
    // Fetch word details using the id
    fetchWordDetailsThunk(id).then((details) => {
      setWordDetails(details);
    })
      .catch((error) => {
        console.error("Error fetching word details:", error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      {wordDetails && (
        <WordCard wordDetails={wordDetails} showDeleteButton={true} showSaveButton={true} isSaved={false} />
      )}
    </div>
  );
};

export default DetailsScreen;
