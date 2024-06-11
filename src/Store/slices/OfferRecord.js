import { createSlice } from "@reduxjs/toolkit";


const offerRecord = createSlice({
    name: "offerRecord",
    initialState: {
        record: null,
    },
    reducers: {
        addRecord: (state, action) => {
            state.record = action.payload;
        },
    },
});
export const { addRecord } = offerRecord.actions;
export default offerRecord.reducer;