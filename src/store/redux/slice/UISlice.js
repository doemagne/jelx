import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartToggle: false,
    notification: null,
};

const uiSlice = createSlice({
    name:'cart-ui',
    initialState: initialState,
    reducers: {
        toggle: (state) => {
            state.cartToggle = !state.cartToggle;
        },
        notify: (state, action) => {
            state.notification = { 
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    }
});

export const { toggle, notify } = uiSlice.actions;

export default uiSlice.reducer;