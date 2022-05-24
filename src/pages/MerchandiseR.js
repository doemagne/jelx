import { Fragment, useState, useEffect, useCallback } from "react";
import MerchandiseJ from "../components/js/MerchandiseR/MerchandiseJ";
import { Navigate } from "react-router-dom";
import CardJ from "../components/js/UI/CardJ";
import AvailableMerchandiseJ from "../components/js/MerchandiseR/MerchandiseAvailableJ";
const MerchandiseR = (props) => {
    window.sessionStorage.setItem("window", window.location.pathname)

    return (
        <Fragment>
            {!props.authenticated && <Navigate to='/' />}
            <CardJ>
                <h1>Merchandise</h1>
            </CardJ>
            <AvailableMerchandiseJ />
        </Fragment>
    );
};

export default MerchandiseR;
/* {cartShown && <CartJ onClose={hideCartHandler} />} */ 
/* {toggleModal && <MerchandiseView onClose={modalToggle} />} */ 
/* <HeaderR onShowCart={showCartHandler} /> */ 
// import HeaderR from "../components/js/Layout/Header/HeaderR";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCartData } from "../store/redux/action/CartAction";
// import CartJ from "../components/js/CartR/CartR";
// import MerchandiseView from "../components/js/MerchandiseR/Item/MerchandiseView";
// import { toggle } from "../store/redux/slice/UISlice";
// const [cartShown, setCartShown] = useState(false);
    // const cart = useSelector((state) => state.cart);
    // const dispatch = useDispatch();
    // const token = window.sessionStorage.getItem("token")
    // const toggleModal = useSelector(state => state.ui.cartToggle);
    // useEffect(() => {
    //     if (cart.uid.length != 0) {
    //         dispatch(fetchCartData(cart,token))
    //     }
    //     return;
    // }, [cart, dispatch]);

    // const showCartHandler = () => {
    //     setCartShown(true);
    // };
    // const hideCartHandler = () => {
    //     setCartShown(false);
    // };
    // const modalToggle = () => {
    //     dispatch(toggle());
    // };
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

