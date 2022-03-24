import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalItems: 0,
    totalAmount: 0.00,
    uid: '',
    user: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            //state.totalItems++;
            const newitem = action.payload;
            const existingItem = state.items.find(item => item.id === newitem.id)
            state.totalAmount = state.totalAmount + newitem.price * newitem.quantity;
            if (!existingItem) {
                state.items.push({
                    id: newitem.id,
                    name: newitem.name,
                    quantity: newitem.quantity,
                    price: newitem.price,
                    total: newitem.price * newitem.quantity,
                    uid: newitem.uid,
                });
            } else {
                existingItem.quantity += newitem.quantity;
                //existingItem.total = existingItem.total + newitem.price;
                existingItem.total = existingItem.quantity * newitem.price;
                //state.totalAmount = state.totalAmount + existingItem.price * newitem.quantity;
            }
        },
        addItemToCarti: (state, action) => {
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
            const existingCartIdx = state.items.findIndex(
                item => item.id === action.item.id
            );
            const existingCartItem = state.items[existingCartIdx];
            let updatedItems;
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.quantity + action.item.quantity
                };
                updatedItems = [...state.items];
                updatedItems[existingCartIdx] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }
            //return {
            state.items = updatedItems;
            state.totalAmount = updatedTotalAmount;
            //};
        },
        removeItemFromCart: (state, action) => {
            state.totalItems--;
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                    state.totalAmount -= existingItem.price;
                } else {
                    existingItem.quantity--;
                    existingItem.total -= existingItem.price;
                    state.totalAmount -= existingItem.price;
                }
            }
        },
        replaceCart: (state, action) => {
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        },
        setguid: (state, action) => {
            console.log(action.payload)
            state.uid = action.payload;
        },
    },
});

export const { addItemToCart, removeItemFromCart, replaceCart, setguid } = cartSlice.actions;

export default cartSlice.reducer;