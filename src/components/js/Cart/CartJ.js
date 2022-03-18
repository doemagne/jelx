import { Fragment, useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import ModalJ from "../UI/ModalJ";
import classes from './Cart.module.css';
import CartItemJ from "./CartItemJ";
import CheckoutJ from "./Checkout/CheckoutJ";

const CartJ = props => {
    const [orderClicked, setOrderClicked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    //{[{id: 'c1', name: 'Sushi', price: 12.99}].map((item) => (
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
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
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    //<li>{item.name}</li>
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