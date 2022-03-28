import { Fragment, useState, useEffect, useCallback } from "react";
import CartJ from "../components/js/CartR/CartR";
import HeaderR from "../components/js/Layout/Header/HeaderR";
import MerchandiseJ from "../components/js/MerchandiseR/MerchandiseJ";
import { setguid } from "../store/redux/slice/CartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { ServerURL, WHCartURL } from '../constraint/ServerURL';
import { Navigate } from "react-router-dom";

let cartuid = '';
//let totalAmountc = '';
//let totalItemsc = '';
const MerchandiseR = props => {
    const [cartShown, setCartShown] = useState(false);
    const [uid, setUID] = useState(cartuid);
    //const [TAmount, setTAmount] = useState('')
    //const [TQuantity, setTQuantity] = useState('')
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

 //   if (!props.authenticated) {
//        window.location.reload();

        /*return (
            <Navigate to="/"/>
        );*/
    //}

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
                //setTAmount(response.total);
                //setTQuantity(response.quantity);
                console.log(uid);
            }
            return;
        }, [cart]);//cartuid = uid;
    //}, []);//cartuid = uid;


    useEffect(() => {
        setUID(props.cartuid);
        updateCartID()
        //const newcart = {
            //uid:props.cartuid,
            //totalAmount:TAmount,
            //totalItems:TQuantity,
        //};
        //dispatch(setguid(newcart));//console.log(cart.uid)
        return;
    }, [dispatch, cart]);

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
//Eventually a structure equivalent to this must be submitted to the database. - this struct will be inserted into indexDB storage feature.
var cartstr = {
    UID:"cf9e22f1-624f-4a69-b4a1-7993eaf64811", 
    Name:"z", 
    Username:"z@z.z",
    Email:"z@z.z",
    CartUID:"492437bf-f19b-4781-89ad-e4b66cc0d13f", 
    Cart:{
        UID:"492437bf-f19b-4781-89ad-e4b66cc0d13f", 
        Items:[
            {
                UID:"c7cdf5db-ab81-4843-8ceb-76cbd33305f1", 
                Quantity:5, 
                Total:99.95, 
                CartUID:"492437bf-f19b-4781-89ad-e4b66cc0d13f", 
                Latched:true,
                Merchandise:{
                    MerchandiseID:1, 
                    UID:"719cfabd-b257-4680-860c-0a23efcd99fe", 
                    Name:"merchandise 0", 
                    Description:"test merchandise description.", 
                    Price:19.99, 
                    ItemRef:"",
                }, 
            }
        ], 
        Total:99.95, 
        Quantity:5
    }
}