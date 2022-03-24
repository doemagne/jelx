import { useState, useEffect, /*useContext, */Fragment } from 'react';
//import CartContext from '../../../../store/cart-context';
import { useSelector } from 'react-redux';
import CartIconJ from '../../CartR/CartIcon/CartIconJ';
import classes from './HeaderCartButton.module.css';


const HeaderCartButtonR = props => {

    //const cartCtx = useContext(CartContext);
    const cartCtx = useSelector(state => state.cart);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.quantity;
    }, 0);
    
    const [btnHigh, setBtnHigh] = useState(false); 

    const buttonClasses = `${classes.button} ${btnHigh ? classes.bump : ''}`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHigh(true);
        const timer = setTimeout(() => {
            setBtnHigh(false);
        }, 290);

        //console.log(items.length);
        return () => {
            clearTimeout(timer);
        };

    }, [items]);

    return (
        <Fragment>
            <button className={buttonClasses} onClick={props.onClick}>
                <span className={classes.icon}><CartIconJ /></span>
                <span>Your Cart</span>
                <span className={classes.badge}>{numberOfCartItems}</span>
            </button>
        </Fragment>
    );
};

export default HeaderCartButtonR;