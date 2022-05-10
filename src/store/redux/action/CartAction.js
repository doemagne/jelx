import { addItemToCart, removeItemFromCart, updateCart } from "../slice/CartSlice";
import { notify } from "../slice/UISlice";
import { sendPutRequest, sendPostRequest, sendTokenPostRequest, sendTokenPutRequest } from "./Request";
import { setloading } from "../slice/UISlice";
//fetchcart
export const fetchCartData = (cart, token) => {
    return (async (dispatch) => {

        dispatch(notify({
            status: 'pending',
            title: 'sending',
            message: 'Sending cart data, please wait',
        }));
        try {
            dispatch(setloading(true));
            const endpoint = '/api/cart/update';
            //const content = await sendPutRequest(cart, endpoint);
            const content = await sendTokenPutRequest(cart, endpoint, token);
            dispatch(notify({
                status: 'success',
                title: 'success',
                message: 'cart data was fetched successfully.',
            }));
            // console.log(content);
            dispatch(updateCart(content.cart));
            dispatch(setloading(false));
        } catch (error) {
            // console.log(error)
            dispatch(notify({
                status: 'error',
                title: 'failed to send',
                message: `${error.message}`,
            }));
            dispatch(setloading(false));
        }
    });
}

export const sendCartItem = (item, token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'request pending',
                message: 'cart data pending.',
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
            dispatch(notify({
                status: 'success',
                title: 'success',
                message: 'cart data was sent successfully.',
            }));
            dispatch(setloading(false));
        } catch (error) {
            dispatch(notify({
                status: 'failed',
                title: 'failed to send',
                message: ` ${error.message}`,
            }));
            dispatch(setloading(false));
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