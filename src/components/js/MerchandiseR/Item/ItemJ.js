import { /*useContext,*/Fragment } from "react";
import ItemFormJ from "./ItemFormJ";
import classes from './Item.module.css';
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../../store/redux/slice/CartSlice";
import { ServerURL } from "../../../../constraint/ServerURL";
const ItemJ = (props) => {
    const dispatch = useDispatch();
    const price = `$${props.price.toFixed(2)}`;
    
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
    const fetchItemHandler = async(quantity) => {
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
    };

    const addToCartHandler = (quantity) => {
        //console.log(props);
        fetchItemHandler(quantity);
        dispatch(addItemToCart({
            id: props.id,
            name: props.name,
            quantity: quantity,
            price: props.price,
            uid: props.uid,
            iref: props.iref,
        }));
    };
    return (
        <Fragment>
            <li className={classes.item}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                </div>
                <div>
                    <ItemFormJ onAddToCart={addToCartHandler} />
                </div>
            </li>
        </Fragment>
    );
};

//<ItemFormJ/>
export default ItemJ;

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


