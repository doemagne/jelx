import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    username: '',
    password: '',
    jwt: '',
    authenticated: false,
    
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        signin: (state) => {
            state.authenticated = true
        },
        signout: (state) => {
            state.authenticated = false
        },
    },
})

export const { signin, signout } = authSlice.actions
export default authSlice.reducer