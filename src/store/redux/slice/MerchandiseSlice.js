import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    merchandise: [],
};

const merchandiseSlice = createSlice({
    name: 'merchandise',
    initialState: initialState,
    reducers: {
        setMerchandise: (state, action) => {
            state.merchandise = action.payload;
            console.log(state.merchandise);
        },
    }
});
export const { setMerchandise } = merchandiseSlice.actions;

export default merchandiseSlice.reducer;