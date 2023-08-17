import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AddWord } from "./add-word";
import { MyWords } from "./my-words";
import { useSelector, useDispatch } from "react-redux";
import { getMyPostsThunk } from "../../services/word-reducer";

const RightComponent = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line
  const [ignore, active] = pathname.split("/");
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (shouldRenderMyWords()) {
      console.log(currentUser);
      dispatch(getMyPostsThunk(currentUser.username));
    }
    // eslint-disable-next-line
  }, [dispatch, active]);

  const shouldRenderAddWord = () => {
    return active !== "define" && active !== "login";
  };

  const shouldRenderMyWords = () => {
    return active === "profile";
  };

  return (
    <div>
      {shouldRenderAddWord() && <AddWord />}
      {shouldRenderMyWords() && (
        <MyWords words={["something", "something2", "thirdThing"]} />
      )}
    </div>
  );
};

export default RightComponent;
