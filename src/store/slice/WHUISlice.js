import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartToggle: false,
};

const whuiSlice = createSlice({
    name:'warehouse-ui',
    initialState: initialState,
    reducers: {
        toggle: (state) => {
            state.cartToggle = !state.cartToggle;
        }
    }
});

export const { toggle } = whuiSlice.actions;

export default whuiSlice.reducer;