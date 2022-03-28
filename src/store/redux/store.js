import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/CounterSlice'
import authReducer from './slice/AuthSlice';
import whuiReducer from './slice/WHUISlice';
import uiReducer from './slice/UISlice';
import whcartReducer from './slice/WHCartSlice';
import cartReducer from './slice/CartSlice';
const Store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        whui: whuiReducer,
        ui: uiReducer,
        whcart: whcartReducer,
        cart: cartReducer,
    },
})

export default Store