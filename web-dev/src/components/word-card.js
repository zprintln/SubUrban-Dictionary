import React from "react";
import { BiBookmark } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteWordDefinitionThunk, addFavoriteWordThunk } from "../services/word-reducer";

const WordCard = ({ wordDetails, showDeleteButton, showSaveButton, isSaved }) => {
  const dispatch = useDispatch();

  const postedDate = new Date(wordDetails.posted_at);
  const formattedDate = postedDate.toDateString();

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-primary"><b>{wordDetails.word}</b></h2>
        <p>{wordDetails.definition}</p>
        <p><em>{wordDetails.example}</em></p>
        <p><b>by&nbsp;<span className="text-primary">{wordDetails.user}</span>{formattedDate}</b></p>
        {showSaveButton && (
          <Button variant="btn btn-outline-success" onClick={() => dispatch(addFavoriteWordThunk(wordDetails))}>
            <BiBookmark /> {isSaved ? "Saved" : "Save"}
          </Button>
        )}
        &nbsp;
        {showDeleteButton && (
          <Button variant="btn btn-outline-danger" className="ml-2" onClick={() => dispatch(deleteWordDefinitionThunk(wordDetails.id))}>
            Unpublish
          </Button>
        )}
      </div>
    </div>
  );
};

export default WordCard;
