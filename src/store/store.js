import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/CounterSlice'
import authReducer from './slice/AuthSlice';
import whuiReducer from './slice/WHUISlice';
import whcartReducer from './slice/WHCartSlice';

const Store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        whui: whuiReducer,
        whcart: whcartReducer,
    },
})

export default Store