import { createSlice } from "@reduxjs/toolkit";
const initialState = {
 opt:""
};

const VerifyNum = createSlice({
  name: "VerifyNumber",
  initialState,
  reducers: {
    verifynumber: (state, action) => {
      state.otp = action.payload.otp;
    },
  },
});
export const { verifynumber } = VerifyNum.actions;
export default VerifyNum.reducer;
