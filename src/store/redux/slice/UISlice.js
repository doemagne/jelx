import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartToggle: false,
};

const uiSlice = createSlice({
    name:'cart-ui',
    initialState: initialState,
    reducers: {
        toggle: (state) => {
            state.cartToggle = !state.cartToggle;
        }
    }
});

export const { toggle } = uiSlice.actions;

export default uiSlice.reducer;