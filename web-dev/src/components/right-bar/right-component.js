import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddWord } from "./add-word";
import { MyWords } from "./my-words";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostsThunk } from "../../services/word-reducer";

const RightComponent = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line
  const [ignore, active] = pathname.split("/");
  const [currentUser, words] = useSelector((state) => {
    return [state.user, state.words];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (active === "profile") {
      dispatch(getMyPostsThunk(currentUser.username));
    }
  }, [dispatch, active, currentUser]);

  const shouldRenderAddWord = () => {
    return active !== "define" && active !== "login";
  };

  const shouldRenderMyWords = () => {
    return active === "profile" && words.wordDefinitions.length > 0;
  };

  return (
    <div>
      {shouldRenderAddWord() && <AddWord />}
      {shouldRenderMyWords() && <MyWords words={words.wordDefinitions} />}
    </div>
  );
};

export default RightComponent;
