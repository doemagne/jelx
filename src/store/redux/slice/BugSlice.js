import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bugs: null,
};

const bugSlice = createSlice({
    name:'bug',
    initialState: initialState,
    reducers: {
        transportBugs: (state, action) => {
            state.bugs = action.payload.content
            console.log(state.bugs)
        },
        addToBugs: (state, action) => {
            const pay = action.payload.content
            pay.id = state.bugs.length + 1
            state.bugs.push(pay)
        }
    }
});

export const { transportBugs, addToBugs } = bugSlice.actions;

export default bugSlice.reducer;