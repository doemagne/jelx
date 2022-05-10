import { Fragment, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalJ from "../UI/ModalJ";
import classes from './Cart.module.css';
import CartItemJ from "./CartItemR";
import CheckoutJ from "./Checkout/CheckoutJ";
import { sendCartItem } from "../../../store/redux/action/CartAction";

const CartJ = props => {
    const [orderClicked, setOrderClicked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useSelector(state => state.cart);
    const cartTotal = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const totalAmount = `$${cartTotal.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const token = window.sessionStorage.getItem("token")
    
    const cartItemRemoveHandler = item => {
        dispatch(sendCartItem({ ...item, quantity: -1 }, token))
    };
    const cartItemAddHandler = item => {
        dispatch(sendCartItem({ ...item, quantity: 1 }, token))
    };

    const orderClickedHandler = () => {
        setOrderClicked(true);
    };

    const submitOrderHandler = async (userdata) => {
        setIsSubmitting(true);
        await fetch(
            "https://merchandise-74a85-default-rtdb.firebaseio.com/orders.json",
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userdata,
                    cart: cartCtx.items
                }),
            });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartitems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItemJ
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    uid={item.uid}
                    iref={item.iref}
                    onRemove={cartItemRemoveHandler.bind(null, item)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const ModalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderClickedHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {orderClicked && <CheckoutJ onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!orderClicked && ModalActions}
        </Fragment>
    );

    const isSubmittingModalContent = (
        <p>Submitting Order Data.</p>
    );
    const didSubmitModalContent = (
        <p>Order Data Was Submitted.</p>
    );

    return (
        <ModalJ onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </ModalJ>
    );
};

export default CartJ;
/*
    const deductItemHandler = async(item) => {
        const tmpi = {
            cartuid: item.cartuid,
            uid: item.uid,
            //quantity: quantity.toString(),
            quantity: 1,
            iref: item.iref,
        };
        const stimulus = await fetch(ServerURL + '/api/cart/item/deduct',
            {
                method: 'POST',//body: JSON.stringify(cart),
                body: JSON.stringify(tmpi),
                headers: { "Content-Type": "application/json" },
                //credentials: 'include',
            });
            const response = await stimulus.json();

    };
    const registerItemHandler = async(item) => {
        const tmpi = {
            cartuid: item.cartuid,
            uid: item.uid,
            //quantity: quantity.toString(),
            quantity: 1,
            iref: item.iref,
        }
        const stimulus = await fetch(ServerURL + '/api/cart/item/register',
            {
                method: 'POST',//body: JSON.stringify(cart),
                body: JSON.stringify(tmpi),
                headers: { "Content-Type": "application/json" },
                //credentials: 'include',
            });
            const response = await stimulus.json();

    };*/