import { useContext,Fragment } from "react";
import ItemFormJ from "./ItemFormJ";
import classes from './Item.module.css';
import CartContext from "../../../../store/cart-context";
const ItemJ = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
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
                    <ItemFormJ onAddToCart={addToCartHandler}/>
                </div>
            </li>
        </Fragment>
    );
};

                    //<ItemFormJ/>
export default ItemJ;