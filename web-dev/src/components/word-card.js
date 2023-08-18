import React, { useState } from 'react';
import { BiBookmark } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { deleteWordDefinition, addFavoriteWord } from '../services/word-service'; 

const WordCard = ({ wordDetails, showDeleteButton, showSaveButton, isSaved }) => {
  const [isLoading, setIsLoading] = useState(false);
  const postedDate = new Date(wordDetails.posted_at);
  const formattedDate = postedDate.toDateString();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await addFavoriteWord(wordDetails);
      alert('Word saved to your favorites!'); 
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error(error); 
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteWordDefinition(wordDetails.id);
      alert('Word definition unpublished successfully.'); 
    } catch (error) {
      alert('Something went wrong. Please try again later.'); 
      console.error(error); 
    }
    setIsLoading(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-primary"><b>{wordDetails.word}</b></h2>
        <p>{wordDetails.definition}</p>
        <p><em>{wordDetails.example}</em></p>
        <p><b>by&nbsp;<span className="text-primary">{wordDetails.user}</span>{formattedDate}</b></p>
        {showSaveButton && (
          <Button variant="btn btn-outline-success" onClick={handleSave} disabled={isLoading}>
            <BiBookmark /> {isSaved ? "Saved" : "Save"}
          </Button>
        )}
        &nbsp;
        {showDeleteButton && (
          <Button variant="btn btn-outline-danger" className="ml-2" onClick={handleDelete} disabled={isLoading}>
            Unpublish
          </Button>
        )}
        {isLoading && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default WordCard;
