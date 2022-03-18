import { useState, useEffect, useContext, Fragment } from 'react';
import CartContext from '../../../../store/cart-context';
import CartIconJ from '../../Cart/CartIcon/CartIconJ';
import classes from './HeaderCartButton.module.css';


const HeaderCartButtonJ = props => {

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
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

export default HeaderCartButtonJ;