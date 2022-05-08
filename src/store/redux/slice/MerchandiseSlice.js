import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
    merchandise: [],
    currentItem: null,
};

const merchandiseSlice = createSlice({
    name: 'merchandise',
    initialState: initialState,
    reducers: {
        setMerchandise: (state, action) => {
            if (action.payload.length > 0 && state.merchandise.length == 0) {
                //const pay = action.payload;
                //state.merchandise = action.payload;
                for (let k in action.payload) {
                    if (action.payload[k].uid) {
                        //console.log(k)
                        state.merchandise.push({
                            active: action.payload[k].active,
                            description: action.payload[k].description,
                            //id: action.payload[k].id,
                            id: k,
                            iref: action.payload[k].iref,
                            name: action.payload[k].name,
                            price: action.payload[k].price,
                            quantity: action.payload[k].quantity,
                            uid: action.payload[k].uid,
                        });
                    }
                }
            }
        },
        yieldCurrentItem: (state, action) => {
            console.log("yeilding 2.")
            if (action.payload) {
                state.currentItem = action.payload;
                console.log(action.payload)
            }
        },
        updateMerchandiseItem: (state, action) => {
            const pay = action.payload
            const qitem = state.merchandise.findIndex((item) => item.uid === pay.uid);
            console.log(qitem)
            if (state.merchandise[qitem]) {
                const currentItem = {
                    active: pay.active,
                    description: pay.description,
                    id: qitem,//state.merchandise[qitem].id,//state.merchandise.length + 1,
                    iref: pay.iref,
                    name: pay.name,
                    price: pay.price,
                    quantity: pay.quantity,
                    uid: pay.uid,
                };
                //state.merchandise[qitem] = state.currentItem
                state.merchandise[qitem] = currentItem
            }
        },
        updateMerchandise: (state, action) => {
            const pay = action.payload
            if (action.payload.uid) {
                state.currentItem = {
                    active: pay.active,
                    description: pay.description,
                    id: state.merchandise.length + 1,
                    iref: pay.iref,
                    name: pay.name,
                    price: pay.price,
                    quantity: pay.quantity,
                    uid: pay.uid,
                };
                state.merchandise.push(state.currentItem)
                console.log(state.currentItem)
            }
            //}
        },
    }
});
export const { setMerchandise, yieldCurrentItem, updateMerchandise, updateMerchandiseItem } = merchandiseSlice.actions;

export default merchandiseSlice.reducer;