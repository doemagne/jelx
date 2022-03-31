import { ServerURL } from "../../../constraint/ServerURL";
import { addItemToCart } from "../slice/CartSlice";
import { notify } from "../slice/UISlice";

//fetchcart
export const fetchCartData = (cart) => {
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
                message: 'cart data was fetched successfully.',
            }));
        } catch (error) {
            dispatch(notify({
                status: 'failed',
                title: 'failed to send',
                message: `[failed to fetch cart data]${error.message}`,
            }));
        }
    });
}

export const sendCartItem = (item) => {
    return (async (dispatch) => {
        const sendRequest = async () => {
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
        };
        try {
            await sendRequest();
            dispatch(addItemToCart(item));
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