import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    toggleCounter: true,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            console.log(state.value)
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        increase: (state,action) => {
            state.value += action.payload.amount
        },
        toggle: (state) => {
            state.toggleCounter = !state.toggleCounter
            console.log(state.toggleCounter)
        }
    },
})

export const { increment, decrement, increase, toggle } = counterSlice.actions
export default counterSlice.reducer