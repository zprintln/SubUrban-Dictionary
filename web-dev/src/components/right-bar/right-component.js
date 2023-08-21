import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddWord } from "./add-word";
import { MyWords } from "./my-words";
import { useSelector } from "react-redux";
import * as wordService from "../../services/word-service";

const RightComponent = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line
  const [ignore, active, username] = pathname.split("/");
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  const [words, setWords] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (active === "profile" && (currentUser !== null || username )) {
      async function getWords() {
        console.log(username);
        setWords(await wordService.findMyWords(username ? username : currentUser.username));
      }

      getWords();
    }
  }, [active, currentUser, navigate]);

  const shouldRenderAddWord = () => {
    return active !== "define" && active !== "login";
  };

  const shouldRenderMyWords = () => {
    return active === "profile" && !!words && words.length > 0;
  };

  return (
    <div>
      {shouldRenderAddWord() && <AddWord />}
      {shouldRenderMyWords() && <MyWords words={words} username={username}/>}
    </div>
  );
};

export default RightComponent;
