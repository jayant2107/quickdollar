import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  language: "en",
  dir: "ltr",
};

const Language = createSlice({
  name: "Changelanguage",
  initialState,
  reducers: {
    changelanguage: (state, action) => {
      state.language = action.payload.language;
      state.dir = action.payload.dir;
    },
  },
});
export const { changelanguage } = Language.actions;
export default Language.reducer;
