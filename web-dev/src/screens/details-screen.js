import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BiBookmark } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { fetchWordDetailsThunk } from "../services/word-reducer";
import { deleteWordDefinitionThunk, addFavoriteWordThunk } from "../services/word-reducer";

const DetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [wordDetails, setWordDetails] = useState(null);

  useEffect(() => {
    //Fetch word details using the id
    fetchWordDetailsThunk(id).then((details) => {
      setWordDetails(details);
    })
      .catch((error) => {
        console.error("Error fetching word details:", error);
      });
  }, [id]);


  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"
  ];

  // Check if wordDetails is null before accessing its properties
  const postedDate = wordDetails ? new Date(wordDetails.posted_at) : null;
  const username = wordDetails ? wordDetails.user : null;
  const formattedDate = postedDate
    ? ` ${monthNames[postedDate.getMonth()]} ${postedDate.getDate()}, ${postedDate.getFullYear()}`
    : "";

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="text-primary"><b>{wordDetails.word}</b></h2>
          <p>{wordDetails.definition}</p>
          <p><em>{wordDetails.example}</em></p>
          <p><b>by&nbsp;<span className="text-primary">{username}</span>{formattedDate}</b></p>
          <Button variant="btn btn-outline-success" onClick={() => dispatch(addFavoriteWordThunk(wordDetails))}>
            <BiBookmark /> Save
          </Button>
          &nbsp;
          <Button variant="btn btn-outline-danger" className="ml-2" onClick={() => dispatch(deleteWordDefinitionThunk(wordDetails.id))}>
            Unpublish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;
