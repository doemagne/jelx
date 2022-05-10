import { Fragment, useState, useEffect, useCallback } from "react";
import CartJ from "../components/js/CartR/CartR";
import HeaderR from "../components/js/Layout/Header/HeaderR";
import MerchandiseJ from "../components/js/MerchandiseR/MerchandiseJ";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData } from "../store/redux/action/CartAction";
import { Navigate } from "react-router-dom";
import MerchandiseView from "../components/js/MerchandiseR/Item/MerchandiseView";
import { toggle } from "../store/redux/slice/UISlice";
//import CardJ from "../components/js/UI/CardJ";

//let isInitial = true;
//let cartuid = '';
const MerchandiseR = (props) => {
    window.sessionStorage.setItem("window", window.location.pathname)
    const [cartShown, setCartShown] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const token = window.sessionStorage.getItem("token")

    const toggleModal = useSelector(state => state.ui.cartToggle);
    useEffect(() => {
        if (cart.uid.length != 0) {
            dispatch(fetchCartData(cart,token))
        }
        return;
    }, [cart, dispatch]);

    const showCartHandler = () => {
        setCartShown(true);
    };
    const hideCartHandler = () => {
        setCartShown(false);
    };
    const modalToggle = () => {
        dispatch(toggle());
    };
    return (
        <Fragment>
            {!props.authenticated && <Navigate to='/' />}
            {cartShown && <CartJ onClose={hideCartHandler} />}
            {toggleModal && <MerchandiseView onClose={modalToggle} />}
            <HeaderR onShowCart={showCartHandler} />
            <main>
                <MerchandiseJ />
            </main>

        </Fragment>
    );
};

export default MerchandiseR;

/*
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
setUID(props.cartuid);
updateCartID().catch(error => {
    dispatch(notify({
        status: 'failed',
        title: 'failed to send',
        //message: 'failed to send cart data, please try again.',
        message: error.message,//'failed to send cart data, please try again.',
    }));
});*/
/*
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
console.log(uid);*/
    //}
    //return;
    //}//, [cart]);//cartuid = uid;
    //}, []);//cartuid = uid;

