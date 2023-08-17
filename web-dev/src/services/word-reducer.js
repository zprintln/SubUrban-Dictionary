import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as wordService from "../services/word-service";

// Create a thunk for creating a new word definition
export const createWordDefinitionThunk = createAsyncThunk(
  "define/createDefinition",
  async (wordDefinition) => {
    // Call service function to create a new word definition
    const response = await wordService.defineWord(wordDefinition);
    return response.data;
  }
);

// Create a thunk for deleting a word definition
export const deleteWordDefinitionThunk = createAsyncThunk(
  "word/deleteDefinition",
  async (wordId) => {
    // Call service function to delete the word definition
    await wordService.deleteWordDefinition(wordId);
    return wordId; // Return the wordId to indicate which definition was deleted
  }
);

// Define the initial state for the word reducer
const initialState = {
  wordDefinitions: [],
};

// Create the word slice
const wordSlice = createSlice({
  name: "word",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createWordDefinitionThunk.fulfilled]: (state, { payload }) => {
      // Add the new word definition to the state
      state.wordDefinitions.push(payload);
    },
    [createWordDefinitionThunk.rejected]: (state, action) => {
      console.log(action.error);
    },
    [deleteWordDefinitionThunk.fulfilled]: (state, { payload }) => {
      // Remove the deleted word definition from the state
      state.wordDefinitions = state.wordDefinitions.filter(
        (definition) => definition.id !== payload
      );
    },
    [deleteWordDefinitionThunk.rejected]: (state, action) => {
      console.log(action.error);
    },
  },
});

export default wordSlice.reducer;
