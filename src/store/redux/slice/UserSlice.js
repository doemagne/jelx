import { createSlice } from "@reduxjs/toolkit";
import indexdb from "../../indexdb/indexdb";


const tx = {
    uid: "",
    name: "",
    username: "",
    email: "",
    cartuid: "",
    authenticated: false,
    cart: {
        uid: "",
        items: [
            {
                uid: "",
                merchandise: {
                    id: 0,
                    uid: "",
                    name: "",
                    description: "",
                    price: 0.00,
                    iref: ""
                },
                quantity: 0,
                total: 0.00,
                cartuid: "",
                latched: false,
            }
        ],
        totalAmount: 0.00,
        totalItems: 0,
    }
}
const initialState = {};//tx;

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setTransport: (state, action) => {
            //const tx = action.payload;
            state = action.payload;
            const idx = indexdb.transport.put(state);
            console.log(state);

        },
        yieldTransport: (state) => {

        },
        setAuthenticationState: (state, action) => {
            const pay = action.payload;
            state.authenticated = pay.authenticated;//(pay.username.length > 0 && pay.uid.length > 0 && pay.cartuid.length > 0)
            state.cart = pay.cart;
            state.username = pay.username;
            state.uid = pay.uid;
            state.cartuid = pay.cartuid;
            console.log(state);
            if (state.authenticated) {
                window.sessionStorage.setItem("user", state.username);
                window.sessionStorage.setItem("useruid", state.uid);
                window.sessionStorage.setItem("cartuid", state.cartuid);
                //console.log(state);
            } else {
                state.authenticated = false;
                console.log("clearing the session storage.")
                window.sessionStorage.setItem("user", "");
                window.sessionStorage.setItem("useruid", "");
                window.sessionStorage.setItem("cartuid", "");
            }
        },
        signin: (state) => {
            state.authenticated = true
        },
        signout: (state) => {
            state.authenticated = false
            window.sessionStorage.setItem("user", null);
            window.sessionStorage.setItem("useruid", null);
            window.sessionStorage.setItem("cartuid", null);
        },
    },
})

export const { setTransport, signin, setAuthenticationState, signout } = userSlice.actions;
export default userSlice.reducer