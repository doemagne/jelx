import { Fragment, useState, useEffect, useCallback } from "react";
import CartJ from "../components/js/CartR/CartR";
import HeaderR from "../components/js/Layout/Header/HeaderR";
import MerchandiseJ from "../components/js/MerchandiseR/MerchandiseJ";
import { setguid } from "../store/slice/CartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { ServerURL, WHCartURL } from '../constraint/ServerURL';
//import CartProvider from "../store/CartProvider";

let cartuid = '';
const MerchandiseR = props => {
    const [cartShown, setCartShown] = useState(false);


    const [uid, setUID] = useState(cartuid);
    //const cartToggle = useSelector((state) => state.whui.cartToggle);
    const cart = useSelector((state) => state.cart);
    //let cartQuantity = useSelector((state) => state.cart.totalItems);
    //let cartTotal = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();

    const fetchCartID = useCallback(//const fetchCartID =
        async () => {
            if (uid.length === 0) {//if (cart.uid.length == 0) {
                const stimulus = await fetch(ServerURL + '/api/cart/register',
                    {
                        method: 'PUT',//body: JSON.stringify(cart),
                        body: JSON.stringify({
                            totalItems: cart.totalItems.toString(),
                            totalAmount: cart.totalAmount.toString(),
                            uid: uid
                        }),
                        headers: { "Content-Type": "application/json" },
                        //credentials: 'include',
                    });
                const response = await stimulus.json();
                setUID(response.uid);
            } else {//console.log(uid);
                /*fetch(WHCartURL + '/whcart.json',
                    {
                        method: 'PUT',//body: JSON.stringify(cart),
                        body: JSON.stringify(cart),
                    });
                //() => {//const fetchCartID = () => {
                    */
                return;
            }
        }, [uid]);//cartuid = uid;
    const updateCartID = useCallback(//const fetchCartID =
        async () => {
            //const scart = cart.toString();
            const quantity = cart.totalItems;
            const amount = cart.totalAmount;
            const items = cart.items;
            const tmpis = [];
            //console.log(quantity.toString());
            //console.log(scart.valueOf());
            const tcart = {
                uid: uid,
                totalAmount: `${amount.toFixed(2)}`,
                totalItems: quantity.toString(),
                //totalAmount: `${cartTotal.toFixed(2)}`,
                //totalAmount: cart.totalAmount.toString(),
            };
            const stimulus = await fetch(ServerURL + '/api/cart/update',
                {
                    method: 'PUT',//body: JSON.stringify(cart),
                    body: JSON.stringify(tcart),
                    headers: { "Content-Type": "application/json" },
                    //credentials: 'include',
                });
            const response = await stimulus.json();
            setUID(response.uid);
            if (items.length > 0) {
                for (const i in items) {
                    const tmpi = {
                        cartuid: uid,
                        itemuid: items[i].uid,
                        quantity: items[i].quantity.toString(),
                    };//console.log(items[i]);
                    //console.log(tmpi);
                    //tmpis.push(tmpi)
                    const stimulus = await fetch(ServerURL + '/api/cart/item/register',
                        {
                            method: 'POST',//body: JSON.stringify(cart),
                            body: JSON.stringify(tmpi),
                            headers: { "Content-Type": "application/json" },
                            //credentials: 'include',
                        });
                    const response = await stimulus.json();
                    //console.log(response);
                }
            }
                    
            return;
        }, [uid, cart]);//cartuid = uid;


    useEffect(() => {
        if (uid.length === 0 || cart.uid.length === 0) {//if (cart.uid.length == 0) {
            fetchCartID();
            dispatch(setguid(uid));//console.log(cart.uid)
        } else {
            //console.log(cart)
            updateCartID()
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
            {cartShown && <CartJ onClose={hideCartHandler} />}
            <HeaderR onShowCart={showCartHandler} />
            <main>
                <MerchandiseJ />
            </main>

        </Fragment>
    );
};

export default MerchandiseR;