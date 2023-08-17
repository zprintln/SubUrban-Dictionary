import React from "react";
import { useLocation } from "react-router-dom";
import { AddWord } from "./add-word";
import { MyWords } from "./my-words";

const RightComponent = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line
  const [ignore, active] = pathname.split("/");

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
