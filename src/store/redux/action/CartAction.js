import { addItemToCart, updateCart } from "../slice/CartSlice";
import { notify } from "../slice/UISlice";
import { sendPutRequest, sendPostRequest } from "./Request";
import { setloading } from "../slice/UISlice";
//fetchcart
export const fetchCartData = (cart) => {
    return (async (dispatch) => {

        dispatch(notify({
            status: 'pending',
            title: 'sending',
            message: 'Sending cart data, please wait',
        }));
        try {
            dispatch(setloading(true));
            const endpoint = '/api/cart/update';
            const content = await sendPutRequest(cart, endpoint);
            dispatch(notify({
                status: 'success',
                title: 'success',
                message: 'cart data was fetched successfully.',
            }));
            console.log(content);
            dispatch(updateCart(content.cart));
            dispatch(setloading(false));
        } catch (error) {
            console.log(error)
            dispatch(notify({
                status: 'error',
                title: 'failed to send',
                message: `[failed to fetch cart data]${error.message}`,
            }));
            dispatch(setloading(false));
        }
    });
}

export const sendCartItem = (item) => {
    return (async (dispatch) => {
        try {
            dispatch(setloading(true));
            const endpoint = '/api/cart/item/register';
            await sendPostRequest(item, endpoint);
            dispatch(addItemToCart(item));
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
                message: `[failed to send cart data]${error.message}`,
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