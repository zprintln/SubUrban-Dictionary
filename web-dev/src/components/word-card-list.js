import React from "react";
import WordCard from "./word-card";

const WordCardList = ({ wordList, showDeleteButton, showSaveButton }) => {
  return (
    <div>
      {wordList.map((wordDetails) => (
        <WordCard
          key={wordDetails.id} 
          wordDetails={wordDetails}
          showDeleteButton={showDeleteButton}
          showSaveButton={showSaveButton}
        />
      ))}
    </div>
  );
};

export default WordCardList;
