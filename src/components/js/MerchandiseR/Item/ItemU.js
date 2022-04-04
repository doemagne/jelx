import { /*useContext,*/Fragment } from "react";
import ItemFormEdit from "./ItemFormEdit";
import classes from './Item.module.css';
import { ServerURL } from "../../../../constraint/ServerURL";
import { yieldCurrentItem } from "../../../../store/redux/slice/MerchandiseSlice";
import { useDispatch } from "react-redux";
//import { sendCartItem } from "../../../../store/redux/action/CartAction";
const ItemJ = (props) => {
    
    const dispatch = useDispatch();
    const price = `$${props.price.toFixed(2)}`;
    //dispatch - function that populates current item in slice
    const setItemEditableHandler = async () => {
        props.setNewItem(false);
        const selecteditem = {
            cartuid: props.cartuid,
            id: props.id,
            name: props.name,
            //quantity: quantity,
            description: props.description,
            price: props.price,
            uid: props.uid,
            iref: props.iref,
        };
        dispatch(yieldCurrentItem(selecteditem));
    }
    return (
        <Fragment>
            <li className={classes.item}>
                <div className={classes.imgcarry}>
                    <img src={`${ServerURL}/assets/media/merchandise/${props.uid}/i.png`} />
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                </div>
                <div>
                    <ItemFormEdit setItemEditable={setItemEditableHandler}/>
                </div>
            </li>
        </Fragment>
    );
};

export default ItemJ;

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


