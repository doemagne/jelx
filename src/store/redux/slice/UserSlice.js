import { createSlice } from "@reduxjs/toolkit";
import indexdb from "../../indexdb/indexdb";

const initialState = {};

const tx = {
    uid: "00000000-0000-0000-0000-000000000000",
    name: "template",
    username: "template@template.template",
    email: "template@template.template",
    cartuid: "00000000-0000-0000-0000-000000000000",
    cart: {
        uid: "00000000-0000-0000-0000-000000000000",
        items: [
            {
                uid: "00000000-0000-0000-0000-000000000000",
                merchandise: {
                    id: 0,
                    uid: "00000000-0000-0000-0000-000000000000",
                    name: "template merchandise",
                    description: "template merchandise description.",
                    price: 0.00,
                    iref: "00000000-0000-0000-0000-000000000000"
                },
                quantity: 0,
                total: 0.00,
                cartuid: "00000000-0000-0000-0000-000000000000",
                latched: false,
            }
        ],
        totalAmount: 0.00,
        totalItems: 0,
    }
}

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
    },
})

export const { setTransport } = userSlice.actions
export default userSlice.reducer