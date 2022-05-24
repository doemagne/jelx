import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartToggle: false,
    notification: null,
    loadstate: false,
    redirectstate: false,
    offline: false,
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
        closeNotification: (state) => {
            state.notification = null
        }, 
        setloading: (state, action) => {
          state.loadstate = action.payload;
        },
        setredirect: (state, action) => {
          state.redirectstate = action.payload;
        },
    }
});

export const { setredirect, setloading, toggle, notify, closeNotification } = uiSlice.actions;

export default uiSlice.reducer;