import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WordCard from "../components/word-card";
import { fetchAllWords } from "../services/word-service";


const HomeScreen = () => {
  const [words, setWords] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToSearchPage = () => {
    navigate("/search"); // Redirect to the search page
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const words = await fetchAllWords();
        setWords(words);
      } catch (error) {
        console.error("Error fetching new words:", error);
      }
    };

    fetchWords();
  }, []);


  return (
    <div className="row">
      <div className="col-11 position-relative">
        <input
          placeholder="Search a definition"
          className="form-control rounded-pill ps-5"
          onClick={redirectToSearchPage} // Redirect to the search page
        />
        <AiOutlineSearch
          className="fs-3 position-absolute"
          style={{ left: "25px", bottom: "3px" }}
          onClick={redirectToSearchPage} // Redirect to the search page
        />
      </div>
      <div className="row mt-3">
        {words.map((wordDetails) => (
          <WordCard
            key={wordDetails.id}
            wordDetails={wordDetails}
            showDeleteButton={!!currentUser}
            showSaveButton={!!currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
