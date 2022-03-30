import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    username: '',
    password: '',
    jwt: '',
    authenticated: false,
    uid: '',
    cartuid: '',

}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setAuthState: (state, action) => {
            const pay = action.payload;
            state.authenticated = (pay.username.length > 0 && pay.uid.length > 0 && pay.cartuid.length > 0)
            if (state.authenticated) {
                state.username = pay.username;
                state.uid = pay.uid;
                state.cartuid = pay.cartuid;
                window.sessionStorage.setItem("user", state.username);
                window.sessionStorage.setItem("useruid", state.uid);
                window.sessionStorage.setItem("cartuid", state.cartuid);
                //console.log('chek session storage.');
            } else {
                state.authenticated = false;
                console.log("clearing the session storage.")
                window.sessionStorage.setItem("user", "");
                window.sessionStorage.setItem("useruid", "");
                window.sessionStorage.setItem("cartuid", "");
                //window.location.reload();
                //window.sessionStorage.clear();
            }
            //console.log(pay);
        },
        signin: (state) => {
            state.authenticated = true
        },
        signout: (state) => {
            state.authenticated = false
            window.sessionStorage.setItem("user", null);
            window.sessionStorage.setItem("useruid", null);
            window.sessionStorage.setItem("cartuid", null);
            //window.location.reload();
            //window.sessionStorage.clear();
        },
    },
})

export const { signin, signout, setAuthState } = authSlice.actions
export default authSlice.reducer