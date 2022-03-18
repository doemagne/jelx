import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../reduxer/starter/Counter/CounterSlice'

const Store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})

export default Store