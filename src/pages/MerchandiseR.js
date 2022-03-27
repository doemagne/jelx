import { Fragment, useState, useEffect, useCallback } from "react";
import CartJ from "../components/js/CartR/CartR";
import HeaderR from "../components/js/Layout/Header/HeaderR";
import MerchandiseJ from "../components/js/MerchandiseR/MerchandiseJ";
import { setguid } from "../store/redux/slice/CartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { ServerURL, WHCartURL } from '../constraint/ServerURL';

let cartuid = '';
//let totalAmountc = '';
//let totalItemsc = '';
const MerchandiseR = props => {
    const [cartShown, setCartShown] = useState(false);
    const [uid, setUID] = useState(cartuid);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const updateCartID = useCallback(//const fetchCartID =
        async () => {
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
                const stimulus = await fetch(ServerURL + '/api/cart/update',
                    {
                        method: 'PUT',//body: JSON.stringify(cart),
                        body: JSON.stringify(tcart),
                        headers: { "Content-Type": "application/json" },
                        //credentials: 'include',
                    });
                setUID(props.uid);
                const response = await stimulus.json();
                console.log(uid);
            }
            return;
        }, [cart]);//cartuid = uid;


    useEffect(() => {
        setUID(props.cartuid);
        updateCartID()
        const newcart = {
            uid:props.cartuid,
            //totalAmount:totalAmountc,
            //totalItems:totalItemsc,
        };
        dispatch(setguid(newcart));//console.log(cart.uid)
        return;
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

    //setAuthCartHandler();
/*const fetchCartID = useCallback(//const fetchCartID =
    async () => {
        setUID(cartuid);
        console.log(uid)
        if (uid.length === 0) {//if (cart.uid.length == 0) {
            const stimulus = await fetch(ServerURL + '/api/cart/register',
                {
                    method: 'PUT',//body: JSON.stringify(cart),
                    body: JSON.stringify({
                        totalItems: cart.totalItems.toString(),
                        totalAmount: cart.totalAmount.toString(),
                        uid: props.cartuid
                    }),
                    headers: { "Content-Type": "application/json" },
                    //credentials: 'include',
                });
            const response = await stimulus.json();
            setUID(response.uid);
        } else {//console.log(uid);
            fetch(WHCartURL + '/whcart.json',
                {
                    method: 'PUT',//body: JSON.stringify(cart),
                    body: JSON.stringify(cart),
                });
            //() => {//const fetchCartID = () => {
            return;
        }
    }, [uid]);//cartuid = uid;
                */
        //if (uid.length === 0 || cart.uid.length === 0) {//if (cart.uid.length == 0) {
        //if (uid.length === 0) {//if (cart.uid.length == 0) {
        //fetchCartID();
        //dispatch(setguid(props.uid));//console.log(cart.uid)
        //} else {
        //console.log(cart)


/*for (const i in items) {
    const tmpi = {
        cartuid: props.cartuid,
        itemuid: items[i].uid,
        quantity: items[i].quantity.toString(),
    };
    const stimulus = await fetch(ServerURL + '/api/cart/item/register',
        {
            method: 'POST',//body: JSON.stringify(cart),
            body: JSON.stringify(tmpi),
            headers: { "Content-Type": "application/json" },
            //credentials: 'include',
        });
    const response = await stimulus.json();
}*/
