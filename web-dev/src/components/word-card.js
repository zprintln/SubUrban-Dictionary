import React, { useEffect, useState } from "react";
import { BiBookmark } from "react-icons/bi";
import * as wordService from "../services/word-service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const WordCard = ({
  wordDetails,
  showDeleteButton,
  showSaveButton,
  showLink,
  onUnSave = (id) => {},
  onDelete = (id) => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const formattedDate = new Date(wordDetails.posted_at);
  const month = formattedDate.toLocaleString("default", { month: "long" });
  const year = formattedDate.getFullYear();
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    async function getSaved() {
      await wordService
        .fetchIsSaved(wordDetails._id, currentUser.username)
        .then((data) => {
          setIsSaved(data.saved);
        });
    }

    if (showSaveButton && currentUser) {
      getSaved();
    }
  }, [wordDetails._id, showSaveButton, currentUser]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (!isSaved) {
        await wordService.addFavoriteWord(
          wordDetails._id,
          currentUser.username
        );
      } else {
        await wordService.deleteFavoriteWord(
          wordDetails._id,
          currentUser.username
        );
        onUnSave(wordDetails._id);
      }
      await wordService
        .fetchIsSaved(wordDetails._id, currentUser.username)
        .then((data) => {
          setIsSaved(data.saved);
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await wordService.deleteWordDefinition(
        wordDetails._id,
        currentUser.username
      );
      onDelete(wordDetails._id);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const canDelete = () => {
    return (
      currentUser &&
      (currentUser.moderator || wordDetails.user === currentUser.username)
    );
  };

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">
        <h2 className="text-primary">
          {showLink && (
            <Link
              to={{
                pathname: `/details/${wordDetails._id}`,
                state: wordDetails,
              }}
            >
              <b>{wordDetails.word}</b>
            </Link>
          )}
          {!showLink && <b>{wordDetails.word}</b>}
        </h2>
        <p>{wordDetails.definition}</p>
        <p>
          <em>{wordDetails.example}</em>
        </p>
        <p>
          <b>
            By&nbsp;<span className="text-primary">{wordDetails.user}</span>
            &nbsp;
            {month}, {year}
          </b>
        </p>
        {showSaveButton && currentUser && (
          <button
            className={`btn ${isSaved ? "btn-success" : "btn-outline-success"}`}
            style={{
              borderRadius: 50,
            }}
            onClick={handleSave}
            disabled={isLoading}
          >
            <BiBookmark /> {isSaved ? "Saved" : "Save"}
          </button>
        )}

        {showDeleteButton && canDelete() && (
          <button
            style={{
              borderRadius: 50,
              marginLeft: 10,
            }}
            className="ml-2 btn btn-outline-danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Unpublish
          </button>
        )}
        {isLoading && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default WordCard;
