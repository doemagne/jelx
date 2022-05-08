import { /*useContext,*/Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ItemFormEdit from "./ItemFormEdit";
import classes from './Item.module.css';
import { ServerURL } from "../../../../constraint/ServerURL";
import { yieldCurrentItem } from "../../../../store/redux/slice/MerchandiseSlice";
import { useDispatch } from "react-redux";
//import { sendCartItem } from "../../../../store/redux/action/CartAction";
const ItemJ = (props) => {
    const navigate = useNavigate();
    const imgref = useRef();
    const [blobUrl, setBlobUrl] = useState('')
    const dispatch = useDispatch();
    const price = `$${props.price.toFixed(2)}`;
    //dispatch - function that populates current item in slice

    const url = `${ServerURL}/assets/media/merchandise/${props.uid}/i.png`;
    const asyncToDataUrl = async (url) =>
        await fetch(url)
            .then(stimulus => stimulus.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                    setBlobUrl(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }))
    const setItemEditableHandler = async () => {
        //props.setNewItem(false);
        const selecteditem = {
            cartuid: props.cartuid,
            id: props.id,
            name: props.name,
            //quantity: quantity,
            description: props.description,
            price: props.price,
            quantity: props.quantity,
            uid: props.uid,
            iref: props.iref,
            active: props.active,
        };
        console.log("yeiding...")
        dispatch(yieldCurrentItem(selecteditem));
        navigate("/merchandise/existing")
    }
    useEffect(() => {
        //generateBlobFromURL();
        asyncToDataUrl(url);
        //toDataUrl(url);
    }, []);
    return (
        <Fragment>
            <li className={classes.item}>
                <div className={classes.imgcarry}>
                    <img ref={imgref} src={blobUrl} onLoad={URL.revokeObjectURL(blobUrl)} />
                    <img src={`${ServerURL}/assets/media/merchandise/${props.uid}/i.png`} />
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                </div>
                <div>
                    <ItemFormEdit setItemEditable={setItemEditableHandler} />
                </div>
            </li>
        </Fragment>
    );
};

export default ItemJ;
/*
    const toDataUrl = (url) =>
        fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                    setBlobUrl(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }))


    const generateBlobFromURL = async () => {
        const url = `${ServerURL}/assets/media/merchandise/${props.uid}/i.png`;
        //console.log(url);
        const blobpart = [url];
        const blob = new Blob(blobpart, { type: "image/*" });//mime type
        //const blob = new Blob(blobpart);//mime type
        const urlobj = URL.createObjectURL(blob);
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(reader.result);
            //let contents = e.target.result;
            //let contents = reader.result;
            //let ascii = btoa(contents);
            setBlobUrl(reader.result);
        }
        reader.readAsDataURL(blob);
        //setBlobUrl(urlobj);

        //console.log(blobUrl)
        //reader.addEventListener("loadend", async function () {})
        //return reader.result;
        //return urlobj;
    };
    //generateBlobFromURL();*/
/*

import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../../store/redux/slice/CartSlice";
const fetchItemHandler = async (quantity) => {
    const tmpi = {
        cartuid: props.cartuid,
        itemuid: props.uid,
        quantity: quantity.toString(),
        iref: props.iref,
    };
    const stimulus = await fetch(ServerURL + '/api/cart/item/register',
        {
            method: 'POST',//body: JSON.stringify(cart),
            body: JSON.stringify(tmpi),
            headers: { "Content-Type": "application/json" },
            //credentials: 'include',
        });
    const response = await stimulus.json();

};

const addToCartHandler = async(quantity) => {
    const titem = {
        cartuid: props.cartuid,
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price,
        uid: props.uid,
        iref: props.iref,
    }
    //console.log(titem);
    //fetchItemHandler(quantity);
    //dispatch(addItemToCart(titem));
    dispatch(sendCartItem(titem));
    //dispatch(addItemToCart({
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price,
        uid: props.uid,
        iref: props.iref,
    }));*/
/*
                    <ItemFormJ onAddToCart={addToCartHandler} />
SYNCHOUS FETCH


    const sfetchItemHandler = (quantity) => {
        const tmpi = {
            cartuid: props.cartuid,
            itemuid: props.uid,
            quantity: quantity.toString(),
            iref: props.iref,
        };
        fetch(ServerURL + '/api/cart/item/register',
            {
                method: 'POST',//body: JSON.stringify(cart),
                body: JSON.stringify(tmpi),
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                response.json()
            })
            .then(data => {
                return data.iref;
            });
    };

for (const i in items) {
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
}

    const fetchItemHandler = async(quantity) => {
        const stimulus = await fetch(ServerURL + '/api/cart/item/register',
            {
                method: 'POST',//body: JSON.stringify(cart),
                body: JSON.stringify(tmpi),
                headers: { "Content-Type": "application/json" },
                //credentials: 'include',
            });
        const response = await stimulus.json();
        return response.uid
    }*/
//synchonous


