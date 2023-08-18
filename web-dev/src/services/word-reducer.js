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

// Create a thunk for fetching word details by id
export const fetchWordDetailsThunk = createAsyncThunk(
  "word/fetchWordDetails",
  async (wordId) => {
    // Call service function to fetch word details
    const response = await wordService.fetchWordDetails(wordId);
    return response.data; // Assuming service returns the fetched details
  }
);

export const getMyPostsThunk = createAsyncThunk("my-posts", async (user) => {
  const response = await wordService.findMyWords(user);
  return response.data;
});

// Create a thunk for deleting a word definition
export const deleteWordDefinitionThunk = createAsyncThunk(
  "word/deleteDefinition",
  async (wordId) => {
    // Call service function to delete the word definition
    await wordService.deleteWordDefinition(wordId);
    return wordId; // Return the wordId to indicate which definition was deleted
  }
);

//Create a thunk for adding a word to the favorites list
export const addFavoriteWordThunk = createAsyncThunk(
  "word/addFavoriteWord",
  async (word) => {
    // Call service function to add the word to the favorites list
    const response = await wordService.addFavoriteWord(word);
    return response.data;
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
    [fetchWordDetailsThunk.fulfilled]: (state, { payload }) => {
      // Update the wordDetails in the state
      state.wordDetails = payload;
    },
    [fetchWordDetailsThunk.rejected]: (state, action) => {
      console.log(action.error);
    },
    [addFavoriteWordThunk.fulfilled]: (state, { payload }) => {
      // Update the wordDetails in the state
      state.wordDetails = payload;
    },
    [addFavoriteWordThunk.rejected]: (state, action) => {
      console.log(action.error);
    }
  },
});

export default wordSlice.reducer;
