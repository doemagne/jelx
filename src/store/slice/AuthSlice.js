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
            state.authenticated = (pay.username.length > 0 && pay.uid.length > 0 && pay.cartuid.length > 0 )
            if (state.authenticated) {
                state.username = pay.username;
                state.uid = pay.uid;
                state.cartuid = pay.cartuid;
            } else {
                state.authenticated = false;
            }
            console.log(pay);
        },
        signin: (state) => {
            state.authenticated = true
        },
        signout: (state) => {
            state.authenticated = false
        },
    },
})

export const { signin, signout, setAuthState } = authSlice.actions
export default authSlice.reducer