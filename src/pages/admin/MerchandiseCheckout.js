import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from '../../components/js/CartR/Cart.module.css';
import CheckoutJ from "../../components/js/CartR/Checkout/CheckoutJ";
import { fetchCartData, sendCartItem } from "../../store/redux/action/CartAction";
import HeaderR from "../../components/js/Layout/Header/HeaderR";
import CardJ from "../../components/js/UI/CardJ";
import { Navigate, useNavigate } from "react-router-dom";
import MerchandiseCartItem from "../../components/js/CartR/MerchandiseCartItem";
import { delayRequest } from "../../store/redux/action/Request";
import Banner from "../../components/js/UI/Banner/Banner";
import CheckoutAddress from "../../components/js/Cart/Checkout/CheckoutAddress";
import CheckoutPayment from "../../components/js/Cart/Checkout/CheckoutPayment";
import CheckoutProfile from "../../components/js/Cart/Checkout/CheckoutProfile";
import MerchandiseCheckoutItem from "../../components/js/CartR/MerchandiseCheckoutItem";

const MerchandiseCheckout = props => {
    const [fieldEdit, setFieldEdit] = useState(true);
    const [cartItems, setCartItems] = useState();
    const [orderClicked, setOrderClicked] = useState(false);
    const navigator = useNavigate()
    const cartCtx = useSelector(state => state.cart);
    const cartTotal = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const totalAmount = `$${cartTotal.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const token = window.sessionStorage.getItem("token")

    const cartItemRemoveHandler = async (item) => {
        dispatch(sendCartItem({ ...item, quantity: -1 }, token))
    };
    const cartItemAddHandler = async (item) => {
        dispatch(sendCartItem({ ...item, quantity: 1 }, token))
    };

    const orderClickedHandler = () => {
        setOrderClicked(!orderClicked);
    };
    const fieldEditHandler = () => {
        setFieldEdit(!fieldEdit)
        console.log(fieldEdit)
    }

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
        navigator(-1)
    }

    useEffect(() => {
        setCartItems(cartCtx.items.map((item) => (
            <MerchandiseCheckoutItem
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

    }, [cartCtx])
    return (
        <section>
            {!props.authenticated && <Navigate to={"/"} />}
            <Fragment>
                {/* <HeaderR onShowCart={showCartHandler} /> */}
                <main><form>
                    <CardJ>
                        <div className={classes.imgcarry}>
                            <h1>Cart Items</h1>
                        </div>
                    </CardJ>
                    <CardJ>
                        <div className="row">
                            <div className="col-sm">
                                <button className="w-100 btn btn-lg btn-warning" type="button" onClick={showCartHandler}>
                                    <span className="bi bi-chevron-double-left" />
                                </button>
                            </div>
                            <div className="col-sm">
                                <button className={`w-100 btn btn-lg btn-primary`} type="button" onClick={fieldEditHandler} >
                                    <span className="bi bi-gear" />
                                </button>
                            </div>
                            {fieldEdit && <div className='col'>
                                <button className={`w-100 btn btn-lg btn-dark`} type="submit" onClick={() => { }}>
                                    <span className="bi bi-hand-thumbs-up" />
                                </button>
                            </div>}
                        </div>
                    </CardJ>
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
                    </CardJ>
                    <CardJ>
                        <div className="row">
                            <CheckoutPayment onconfirm={submitOrderHandler} onCancel={showCartHandler} fieldEdit={fieldEdit} setFieldEdit={() => { }} />
                            <div className="col-sm">
                                <Banner banner={"credit-card-2-front"} />
                            </div>
                        </div>
                        <div className="row">
                            <CheckoutProfile onConfirm={submitOrderHandler} onCancel={showCartHandler} fieldEdit={fieldEdit} setFieldEdit={setFieldEdit} />
                            <div className="col-sm">
                                <Banner banner={"person-circle"} />
                            </div>
                        </div>
                        <div className="row">
                            <CheckoutAddress onConfirm={submitOrderHandler} onCancel={showCartHandler} fieldEdit={fieldEdit} setFieldEdit={setFieldEdit} />
                            <div className="col-sm">
                                <Banner banner={"geo"} />
                            </div>
                        </div>
                    </CardJ>

                    <Banner banner={'cart-check'} />
                </form>

                </main>
            </Fragment>
        </section>

    );
};

export default MerchandiseCheckout;

/*
const tmpi = {
    cartuid: item.cartuid,
    uid: item.uid,
    quantity: -1,
    iref: item.iref,
};const tmpi = {
    cartuid: item.cartuid,
    uid: item.uid,
    quantity: 1,
    iref: item.iref,
}
const stimulus = await fetch(ServerURL + '/api/cart/item/deduct',
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


<Fragment onClose={showCartHandler}> */
