import { Fragment } from 'react';
import classes from './CartItem.module.css';

const MerchandiseCartItem = (props) => {

  return (
    <Fragment>
      {props.price &&
        <li className={classes['cart-item']}>
          <div>
            <h2>{props.name}</h2>
            <div className={classes.summary}>
              <span className={classes.price}>{`$ ${props.price.toFixed(2)}`}</span>
              <span className={classes.amount}>x {props.quantity}</span>
            </div>
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={props.onRemove}>
              <span className="bi bi-dash-circle" />
            </button>
            <button type="button" onClick={props.onAdd}>
              <span className="bi bi-plus-circle" />
            </button>
            <button type="button" onClick={props.onRemove}>
              <span className="bi bi-x-circle" />
            </button>
          </div>
        </li>
      }
    </Fragment>
  )
};

export default MerchandiseCartItem;