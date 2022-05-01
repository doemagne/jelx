import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    merchandise: [],
    currentItem: null,
};

const merchandiseSlice = createSlice({
    name: 'merchandise',
    initialState: initialState,
    reducers: {
        setMerchandise: (state, action) => {
            console.log(action.payload);
            state.merchandise = action.payload;
        },
        yieldCurrentItem: (state, action) => {
            if (action.payload) {
                state.currentItem = action.payload;
            }
        },
    }
});
export const { setMerchandise, yieldCurrentItem } = merchandiseSlice.actions;

export default merchandiseSlice.reducer;