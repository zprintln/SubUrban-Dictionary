import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as searchService from "../services/search-service";
import WordCard from "../components/word-card";
import { useParams, useNavigate } from "react-router-dom";

const SearchScreen = () => {
  const { q } = useParams();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await searchService.handleSearch(q);
        setResults(details);
      } catch (error) {
        console.error("Error fetching word details:", error);
      }
    };

    if (q) fetchData();
  }, [q]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${event.target.value}`);
    }
  };

  return (
    <div className="row">
      <div className="col-11 position-relative" style={{ marginBottom: 10 }}>
        <input
          placeholder="Search a definition"
          className="form-control rounded-pill ps-5"
          onKeyDown={(e) => handleKeyDown(e)}
          autoFocus // Focus on the input field
        />
        <AiOutlineSearch
          className="fs-3 position-absolute"
          style={{ left: "25px", bottom: "5px" }}
        />
      </div>
      <div>
        {results &&
          results.map((result, index) => (
            <WordCard
              key={index}
              wordDetails={result}
              showDeleteButton={false}
              showSaveButton={false}
              showLink
            />
          ))}
      </div>
    </div>
  );
};

export default SearchScreen;
