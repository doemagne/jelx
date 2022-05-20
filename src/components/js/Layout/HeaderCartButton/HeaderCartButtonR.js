import { useState, useEffect, /*useContext, */Fragment } from 'react';
//import CartContext from '../../../../store/cart-context';
import { useSelector } from 'react-redux';
import CartIconJ from '../../CartR/CartIcon/CartIconJ';
import classes from './HeaderCartButton.module.css';


const HeaderCartButtonR = props => {

    //const cartCtx = useContext(CartContext);
    const cartCtx = useSelector(state => state.cart);

    const { items } = cartCtx;
    const tAmount = cartCtx.totalAmount;    
    const tItems = cartCtx.totalItems;
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.quantity;
    }, 0);
    
    const [btnHigh, setBtnHigh] = useState(false); 

    const buttonClasses = `${classes.badge} ${btnHigh ? classes.bump : ''}`;
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
                <span>Cart</span>
                <span className={classes.badge}>{numberOfCartItems}</span>
            </button>
        </Fragment>
    );
};

export default HeaderCartButtonR;