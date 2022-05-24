import { addItemToCart, removeItemFromCart, updateCart } from "../slice/CartSlice";
import { notify } from "../slice/UISlice";
import { sendPutRequest, sendPostRequest, sendTokenPostRequest, sendTokenPutRequest } from "./Request";
import { setloading } from "../slice/UISlice";
//fetchcart
export const fetchCartData = (cart, token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'fetching',
                message: 'fetching cart data, please wait',
            }));
            dispatch(setloading(true));
            const endpoint = '/api/cart/update';
            const content = await sendTokenPutRequest(cart, endpoint, token);
            dispatch(updateCart(content.cart));
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'fetched cart',
                message: `cart data was fetched`,
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed to fetch cart',
                message: `${error.message}`,
            }));
        }
    });
}

export const sendCartItem = (item, token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'pending',
                message: 'updating cart',
            }))
            dispatch(setloading(true));
            const endpoint = '/api/cart/item/register';
            //await sendPostRequest(item, endpoint);
            await sendTokenPostRequest(item, endpoint, token);
            if (item.quantity < 0) {
                dispatch(removeItemFromCart(item.id));
            } else {
                dispatch(addItemToCart(item));
            }
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'updated',
                message: 'cart was updated.',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed to update',
                message: ` ${error.message}`,
            }));
        }
    });
}
        /*const sendRequest = async () => {
const tmpi = {
uid: item.iref,
quantity: item.quantity,
//iref: item.uid,
};
const stimulus = await fetch(ServerURL + '/api/cart/item/register',
{
method: 'POST',//body: JSON.stringify(cart),
//body: JSON.stringify(item),
body: JSON.stringify(tmpi),
headers: { "Content-Type": "application/json" },
//credentials: 'include',
});
if (!stimulus.ok) {
throw new Error('Error: failed to cart data.')
}
const response = await stimulus.json();
};*/

/*const sendRequest = async () => {
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
}*/