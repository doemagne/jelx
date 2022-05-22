import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bugs: null,
    current: null,
};

const bugSlice = createSlice({
    name: 'bug',
    initialState: initialState,
    reducers: {
        setCurrent: (state, action) => {
            // const bl = state.bugs
            if (action.payload) {
                const b = state.bugs.find(bi => bi.id === action.payload)
                if (b) {
                    console.log(b)
                    state.current = b
                }
                // state.current = state.bugs[b]
            }
        },
        transportBugs: (state, action) => {
            state.bugs = action.payload.content
            // console.log(state.bugs)
        },
        addToBugs: (state, action) => {
            const pay = action.payload.content
            pay.id = state.bugs.length + 1
            state.bugs.push(pay)
        },
        updateBug: (state, action) => {
            const pay = action.payload
            const b = state.bugs.findIndex(bi => bi.id === pay.id)
            // console.log(b)
            // console.log(pay.id)
            if (state.bugs[b]) {
                state.bugs[b] = pay
            }
        },
    }
});

// state.bugs[b] = {pay}
export const { transportBugs, addToBugs, setCurrent, updateBug } = bugSlice.actions;

export default bugSlice.reducer;