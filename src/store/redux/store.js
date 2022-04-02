import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/CounterSlice'
import authReducer from './slice/AuthSlice';
import whuiReducer from './slice/WHUISlice';
import uiReducer from './slice/UISlice';
import whcartReducer from './slice/WHCartSlice';
import cartReducer from './slice/CartSlice';
import userReducer from './slice/UserSlice';
import merchandiseReducer from './slice/MerchandiseSlice';

const Store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
        user: userReducer,
        merchandise: merchandiseReducer,
        counter: counterReducer,
        auth: authReducer,
        whui: whuiReducer,
        whcart: whcartReducer,
    },
})

export default Store