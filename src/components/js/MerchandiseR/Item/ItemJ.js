import { Link } from 'react-router-dom';
import { /*useContext,*/Fragment } from "react";
import ItemFormJ from "./ItemFormJ";
import classes from './Item.module.css';
import { useDispatch } from "react-redux";
//import { addItemToCart } from "../../../../store/redux/slice/CartSlice";
import { ServerURL } from "../../../../constraint/ServerURL";
import { sendCartItem } from "../../../../store/redux/action/CartAction";
import { yieldCurrentItem } from "../../../../store/redux/slice/MerchandiseSlice";
import { toggle } from "../../../../store/redux/slice/UISlice";
const ItemJ = (props) => {
    const dispatch = useDispatch();
    const price = `$${props.price.toFixed(2)}`;
    const token = window.sessionStorage.getItem("token")

    const setItemDetailHandler = () => {
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

    const addToCartHandler = async (quantity) => {
        const titem = {
            cartuid: props.cartuid,
            id: props.id,
            name: props.name,
            quantity: quantity,
            price: props.price,
            uid: props.uid,
            iref: props.iref,
        }
        dispatch(sendCartItem(titem,token));
    };
    const viewItemHandler = () => {

        dispatch(toggle());
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

    };
    return (
        <Fragment>
            <li className={classes.item}>
                        <div className="col-sm-1">
                        <Link to={`/merchandise/detail`}>
                            <div className={classes.imgcarry}>
                                <img src={`${ServerURL}/assets/media/merchandise/${props.uid}/i.png`} onClick={setItemDetailHandler}/>
                            </div>
                        </Link>
                        </div>
                        <div className="col-sm-8">
                            <button onClick={viewItemHandler} className="btn btn-default btn-outline-success"><h3>{props.name}</h3></button>
                            <div className={classes.description}>{props.description}</div>
                            <div className={classes.price}>{price}</div>
                        </div>
                        <div className="col-sm-3">
                            <ItemFormJ priceclass={classes.price} price={props.price} onAddToCart={addToCartHandler} />
                        </div>
            </li>
        </Fragment>
    );
};

//<ItemFormJ/>
export default ItemJ;

        //console.log(titem);
        //fetchItemHandler(quantity);
        //dispatch(addItemToCart(titem));
/*const fetchItemHandler = async (quantity) => {
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

};*/
/*dispatch(addItemToCart({
    id: props.id,
    name: props.name,
    quantity: quantity,
    price: props.price,
    uid: props.uid,
    iref: props.iref,
}));*/
/*
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


