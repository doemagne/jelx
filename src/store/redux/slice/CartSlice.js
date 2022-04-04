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
            state.totalItems += newitem.quantity
            if (!existingItem) {
                //const iref = uuidv4();
                //console.log(iref);
                state.items.push({
                    id: newitem.id,
                    name: newitem.name,
                    quantity: newitem.quantity,
                    price: newitem.price,
                    total: newitem.price * newitem.quantity,
                    uid: newitem.uid,
                    iref: newitem.iref,
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
        updateCart: (state, action) => {
            //const pay = action.payload;
            //console.log(pay);
            if (action.payload) {
                state.uid = action.payload.uid;
                state.totalAmount = action.payload.totalAmount;
                state.totalItems = action.payload.totalItems;
                if (state.items.length == 0) {
                    for (const i in action.payload.items) {
                        if (action.payload.items[i].latched) {
                            state.items.push({
                                id: action.payload.items[i].merchandise.id,
                                name: action.payload.items[i].merchandise.name,
                                quantity: action.payload.items[i].quantity,
                                price: action.payload.items[i].merchandise.price,
                                total: action.payload.items[i].total,
                                uid: action.payload.items[i].merchandise.uid,
                                iref: action.payload.items[i].uid,
                            });
                        }
                        //state.merchandise.push()
                    }
                }
            }
        },
    },
});
export const { addItemToCart, removeItemFromCart, replaceCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
/*
export const sendCartData = (cart) => {
    return (async (dispatch) => {

        dispatch(notify({
            status: 'pending',
            title: 'sending',
            message: 'Sending cart data, please wait',
        }));
        const sendRequest = async () => {
            const stimulus = await fetch(ServerURL + '/api/cart/update',
                {
                    method: 'PUT',//body: JSON.stringify(cart),
                    body: JSON.stringify(cart),
                    headers: { "Content-Type": "application/json" },
                    //credentials: 'include',
                });
            if (!stimulus.ok) {
                throw new Error('Error: failed to cart data.')
            }
            const response = await stimulus.json();
        }
        try {
            await sendRequest();
            dispatch(notify({
                status: 'success',
                title: 'success',
                message: 'cart data was sent successfully.',
            }));
        } catch (error) {
            dispatch(notify({
                status: 'failed',
                title: 'failed to send',
                message: `[failed to send cart data]${error.message}`,
            }));

        }

    });
}
*/