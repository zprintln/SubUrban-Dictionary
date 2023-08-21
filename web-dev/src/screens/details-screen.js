import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WordCard from "./../components/word-card";
import { fetchWordDetails } from "../services/word-service";

const DetailsScreen = () => {
  const { id } = useParams();
  const [wordDetails, setWordDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchWordDetails(id);
        setWordDetails(details);
      } catch (error) {
        console.error("Error fetching word details:", error);
      }
    };
    
    fetchData()
  }, [id]);

  const handleDelete = (id) => {
    navigate("/home");
  }

  return (
    <div className="container mt-5">
      {wordDetails && (
        <WordCard wordDetails={wordDetails} showDeleteButton showSaveButton showLink={false} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default DetailsScreen;
