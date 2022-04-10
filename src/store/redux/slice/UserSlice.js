import { start } from "@popperjs/core";
import { createSlice } from "@reduxjs/toolkit";
import indexdb from "../../indexdb/indexdb";

const tx = {
    uid: null,
    name: null,
    username: null,
    email: null,
    cartuid: null,
    authenticated: false,
    cart: null,
    address: null,
}
const initialState = tx;

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setTransport: (state, action) => {
            console.log(action.payload)
            const idx = indexdb.transport.put(action.payload);
            const pay = action.payload.content;
            state.uid = pay.uid;
            state.name = pay.name;
            state.username = pay.username;
            state.email = pay.email;
            state.cartuid = pay.cartuid
            state.authenticated = pay.authenticated;
            state.cart = pay.cart;
            state.address = pay.address;
            //console.log(state);
            if (state.authenticated) {
                window.sessionStorage.setItem("user", state.username);
                window.sessionStorage.setItem("useruid", state.uid);
                window.sessionStorage.setItem("cartuid", state.cartuid);
                //console.log(state);
                
            } else {
                indexdb.delete();
                state.authenticated = false;
                console.log("clearing the session storage.")
                window.sessionStorage.setItem("user", "");
                window.sessionStorage.setItem("useruid", "");
                window.sessionStorage.setItem("cartuid", "");
            }
        },
        authenticator: (state, action) => {
            if (!state.authenticated) {
                console.log(action.payload)
                if (action.payload.authenticated) {
                    state.authenticated = action.payload.authenticated;
                }

            }
        },
        signout: (state) => {
            state.authenticated = false
            state = tx;
            indexdb.delete();
            /*let req = indexedDB.deleteDatabase('Merchandiser');
            req.onsuccess = () => {
                console.log('deleted indexedDB database.')
            }
            req.onerror = () => {
                console.log('could not delete indexedDB database.')
            }
            req.onblocked = () => {
                console.log('blocked indexedDB database deletion.')
            }*/
            window.location.reload();
            window.sessionStorage.setItem("user", null);
            window.sessionStorage.setItem("useruid", null);
            window.sessionStorage.setItem("cartuid", null);
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
                indexdb.delete();
            }
        },
    },
})

export const { setTransport, authenticator, setAuthenticationState, signout } = userSlice.actions;
export default userSlice.reducer
/*

const tx = {
    uid: null,
    name: null,
    username: null,
    email: null,
    cartuid: null,
    authenticated: false,
    cart: {
        uid: null,
        items: [
            {
                uid: null,
                merchandise: {
                    id: 0,
                    uid: null,
                    name: null,
                    description: null,
                    price: 0.00,
                    iref: null
                },
                quantity: 0,
                total: 0.00,
                cartuid: null,
                latched: false,
            }
        ],
        totalAmount: 0.00,
        totalItems: 0,
    }
}
*/