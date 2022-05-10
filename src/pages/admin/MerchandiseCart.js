import { Fragment, useContext, useEffect, useState } from "react";
//import CartContext from "../../../store/cart-context";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/redux/slice/CartSlice";
// import ModalJ from "../UI/ModalJ";
import classes from '../../components/js/CartR/Cart.module.css';
// import CartItemJ from "./CartItemR";
// import CheckoutJ from "./Checkout/CheckoutJ";
// import { ServerURL } from "../../../constraint/ServerURL";
import CartItemJ from "../../components/js/CartR/CartItemR";
import CheckoutJ from "../../components/js/CartR/Checkout/CheckoutJ";
// import { ServerURL } from "../../constraint/ServerURL";
import { fetchCartData, sendCartItem } from "../../store/redux/action/CartAction";
import HeaderR from "../../components/js/Layout/Header/HeaderR";
import CardJ from "../../components/js/UI/CardJ";
import { Navigate, useNavigate } from "react-router-dom";
import MerchandiseCartItem from "../../components/js/CartR/MerchandiseCartItem";
import { delayRequest } from "../../store/redux/action/Request";

const MerchandiseCart = props => {
    const [cartItems, setCartItems] = useState();
    const [orderClicked, setOrderClicked] = useState(false);
    const navigator = useNavigate()
    const cartCtx = useSelector(state => state.cart);
    const cartTotal = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const totalAmount = `$${cartTotal.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const token = window.sessionStorage.getItem("token")
    const deductItemHandler = async (item) => {
        const tmpi = {
            cartuid: item.cartuid,
            uid: item.uid,
            quantity: -1,
            iref: item.iref,
        };
        dispatch(sendCartItem(tmpi, token))
    };
    const registerItemHandler = async (item) => {
        const tmpi = {
            cartuid: item.cartuid,
            uid: item.uid,
            quantity: 1,
            iref: item.iref,
        }
        dispatch(sendCartItem(tmpi, token))

    };
    const cartItemRemoveHandler = async (item) => {
        //cartCtx.removeItem(id);
        if (!item) {
            return;
        }
        console.log(item)
        dispatch(removeItemFromCart(item.id));
        await deductItemHandler(item);
        return
    };
    const cartItemAddHandler = item => {
        //cartCtx.addItem({ ...item, amount: 1 });
        dispatch(addItemToCart({ ...item, quantity: 1 }));
        registerItemHandler(item);
    };

    const orderClickedHandler = () => {
        setOrderClicked(true);
    };

    const submitOrderHandler = async (userdata) => {
        await fetch(
            "https://merchandise-74a85-default-rtdb.firebaseio.com/orders.json",
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userdata,
                    cart: cartCtx.items
                }),
            });
        cartCtx.clearCart();
    };

    const showCartHandler = () => {
        navigator("/merchandise/cartr")
    }

    useEffect(() => {
        setCartItems(cartCtx.items.map((item) => (
            <MerchandiseCartItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                uid={item.uid}
                iref={item.iref}
                onRemove={cartItemRemoveHandler.bind(null, item)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        )))
        return;

    }, [cartCtx, dispatch])
    //onAdd={cartItemAddHandler.bind(null, item)}



    //<li>{item.name}</li>
    const ModalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={showCartHandler}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderClickedHandler}>Order</button>}
        </div>
    );
    // <HeaderR onShowCart={showCartHandler} />

    return (
        <Fragment>
            {!props.authenticated && <Navigate to={"/"} />}
            <CardJ>
                <main>
                    <CardJ>
                        <ul className={classes['cart-items']}>
                            {cartItems}
                        </ul>
                    </CardJ>
                    <CardJ>
                        <div className={classes.total}>
                            <span>Total Amount</span>
                            <span>{totalAmount}</span>
                        </div>
                        {orderClicked && <CheckoutJ onConfirm={submitOrderHandler} onCancel={showCartHandler} />}
                        {ModalActions}
                    </CardJ>
                </main>
            </CardJ>
        </Fragment>
    );
};

export default MerchandiseCart;
{
        /*const stimulus = await fetch(ServerURL + '/api/cart/item/deduct',
            {
                method: 'POST',//body: JSON.stringify(cart),
                body: JSON.stringify(tmpi),
                headers: { "Content-Type": "application/json" },
                //credentials: 'include',
            });
        const response = await stimulus.json();*/


        /*const stimulus = await fetch(ServerURL + '/api/cart/item/register',
            {
                method: 'POST',//body: JSON.stringify(cart),
                body: JSON.stringify(tmpi),
                headers: { "Content-Type": "application/json" },
                //credentials: 'include',
            });
        // const response = await stimulus.json();*/

    /*
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}

    const isSubmittingModalContent = (
        <p>Submitting Order Data.</p>
    );
    const didSubmitModalContent = (
        <p>Order Data Was Submitted.</p>
    );


<Fragment onClose={showCartHandler}> */ }
