import { Fragment, useState, useEffect, useCallback } from "react";
import CartJ from "../../components/js/CartR/CartR";
import HeaderR from "../../components/js/Layout/Header/HeaderR";
import MerchandiseJ from "../../components/js/MerchandiseR/MerchandiseJ";
import { useSelector, useDispatch } from 'react-redux';
import { ServerURL, WHCartURL } from '../../constraint/ServerURL';
import { notify } from '../../store/redux/slice/UISlice';
import Notification from "../components/js/UI/Notification";
let isInitial = true;
let cartuid = '';
const MerchandiseR = props => {
    const [cartShown, setCartShown] = useState(false);
    const [uid, setUID] = useState(cartuid);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    //const updateCartID = useCallback(//
    const updateCartID = async () => {
        if (props.cartuid.length > 0) {
            setUID(props.cartuid);
            console.log(props.cartuid)
            const quantity = cart.totalItems;
            const amount = cart.totalAmount;
            const tcart = {
                uid: props.cartuid,
                totalAmount: `${amount.toFixed(2)}`,
                totalItems: quantity.toString(),
            };
            dispatch(notify({
                status: 'pending',
                title: 'sending',
                message: 'Sending cart data, please wait',
            }));
            const stimulus = await fetch(ServerURL + '/api/cart/update',
                {
                    method: 'PUT',//body: JSON.stringify(cart),
                    body: JSON.stringify(tcart),
                    headers: { "Content-Type": "application/json" },
                    //credentials: 'include',
                });
            setUID(props.uid);
            if (!stimulus.ok) {
                throw new Error('Error: failed to cart data.')
            }
            const response = await stimulus.json();
            dispatch(notify({
                status: 'success',
                title: 'success',
                message: 'cart data was sent successfully.',
            }));
            console.log(uid);
        }
        return;
    }//, [cart]);//cartuid = uid;
    //}, []);//cartuid = uid;


    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        } else {
            setUID(props.cartuid);
            updateCartID().catch(error => {
                dispatch(notify({
                    status: 'failed',
                    title: 'failed to send',
                    //message: 'failed to send cart data, please try again.',
                    message: error.message,//'failed to send cart data, please try again.',
                }));
            });
            return;
        }
    }, [cart, dispatch]);

    const showCartHandler = () => {
        setCartShown(true);
    };
    const hideCartHandler = () => {
        setCartShown(false);
    };
    return (
        <Fragment>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
            {cartShown && <CartJ onClose={hideCartHandler} />}
            <HeaderR onShowCart={showCartHandler} />
            <main>
                <MerchandiseJ />
            </main>

        </Fragment>
    );
};

export default MerchandiseR;
