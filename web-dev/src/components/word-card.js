import React, { useState } from 'react';
import { BiBookmark } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { deleteWordDefinition, addFavoriteWord } from '../services/word-service';
import { useNavigate } from 'react-router-dom';

const WordCard = ({ wordDetails, showDeleteButton, showSaveButton }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); 
  const postedDate = new Date(wordDetails.posted_at);
  const formattedDate = postedDate.toDateString();
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await addFavoriteWord(wordDetails);
      setIsSaved(true);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteWordDefinition(wordDetails.id);
      navigate('/home');
    } catch (error) {
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
          <Button 
            variant={isSaved ? "success" : "outline-success"} // Changes the color of the button based on whether the word is saved or not
            onClick={handleSave} 
            disabled={isLoading}>
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
