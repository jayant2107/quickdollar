import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "day",
};

export const ColorTheme = createSlice({
  name: "nightmode",
  initialState,
  reducers: {
    changebgcolor: (state, action) => {
      console.log(action, "sdcdcsdcdsc", action?.payload)
      state.theme = action?.payload;
    },
  },
});

export const { changebgcolor } = ColorTheme.actions;
export default ColorTheme.reducer;
