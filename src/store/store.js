import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../reduxer/starter/Counter/CounterSlice'
import authReducer from '../reduxer/starter/Auth/AuthSlice';

const Store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
    },
})

export default Store