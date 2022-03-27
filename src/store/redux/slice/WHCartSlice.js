import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalItems: 0,
    totalAmount: 0.00,
    uid:'',
};

const whcartSlice = createSlice({
    name: 'warehouse-cart',
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.totalItems++;
            const newitem = action.payload;
            const existingItem = state.items.find(item => item.id === newitem.id)
            if (!existingItem) {
                state.items.push({
                    id: newitem.id,
                    name: newitem.name,
                    quantity: 1,
                    price: newitem.price,
                    total: newitem.price,
                });
                state.totalAmount += newitem.price;
            } else {
                existingItem.quantity++;
                existingItem.total = existingItem.total + newitem.price;
                state.totalAmount += existingItem.price;
            }
        },
        removeItemFromCart: (state, action) => {
            state.totalItems--;
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.total -= existingItem.price;
                }
            }
        },
        replaceCart: (state,action) => {
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        },
        setguid: (state,action) => {
            console.log(action.payload)
            state.uid = action.payload;
        },
    },
});

export const { addItemToCart, removeItemFromCart, replaceCart, setguid } = whcartSlice.actions;

export default whcartSlice.reducer;