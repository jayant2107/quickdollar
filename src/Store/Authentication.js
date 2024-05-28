import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};

const Authentication = createSlice({
  name: "Authlogin",
  initialState,
  reducers: {
    authlogin: (state, action) => {
      state.data = action.payload;
      console.log(action,'state---')
    },
    authlogout: (state, action) => {
      state.data = [];
    },
  },
});
export const { authlogin, authlogout } = Authentication.actions;
export default Authentication.reducer;
