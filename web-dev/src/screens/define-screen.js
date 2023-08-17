import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import the useDispatch hook
import { createWordDefinitionThunk } from "../services/word-reducer"; // Import the new word thunk

function DefineScreen() {
  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch(); // Initialize the useDispatch hook
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const handleNewWord = async () => {
    try {
      const newWordDefinition = {
        word: word,
        definition: definition,
        example: example,
        user: currentUser.username,
      };

      await dispatch(createWordDefinitionThunk(newWordDefinition))
        .then(() => {
          // Handle success, e.g., navigate or show a success message
          console.log("Word definition created successfully");
        })
        .catch(() => {
          // Handle error, e.g., show an error message
          console.log("Unable to create word definition");
        });

      // Reset the input fields
      setWord("");
      setDefinition("");
      setExample("");
    } catch (error) {
      alert(error); // Handle unexpected errors
    }
  };
  return (
    <div>
      <h2>Define a Word</h2>
      <br />
      <div className="mt-2">
        <label>
          <p>
            <b>Share definitions</b> that other people will find meaningful and
            never post hate speech or people’s personal information.
          </p>
        </label>
        <textarea
          className="form-control"
          type="word"
          placeholder="Word"
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />
      </div>
      <div className="mt-2">
        <label>
          <p>
            <b>Write for a large audience.</b> Lots of people will read this, so
            give some background information. <br />
            <b>Don’t name your friends.</b> We’ll reject inside jokes and
            definitions naming non-celebrities.
          </p>
        </label>
        <textarea
          className="form-control"
          type="definition"
          placeholder="Type your definition here..."
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
        />
      </div>
      <div className="mt-2">
        <textarea
          className="form-control"
          type="example"
          placeholder="Type an example of how it’s used in a sentence..."
          value={example}
          onChange={(event) => setExample(event.target.value)}
        />
      </div>
      <br />
      <button className="btn btn-primary mt-2" onClick={handleNewWord}>
        Submit!
      </button>
    </div>
  );
}

export default DefineScreen;
