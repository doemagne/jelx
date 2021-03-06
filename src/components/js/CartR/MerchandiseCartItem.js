import { Fragment } from 'react';
import classes from './CartItem.module.css';

const MerchandiseCartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`
  const ntotal = props.price.toFixed(2) * props.quantity
  const total = `$${ntotal.toFixed(2)}`
  // <li className={classes['cart-item']}>

  return (
    <Fragment>
        <li className={classes['cart-item']}>
          <div className='row'>
            <div className='col-2'>
              <div className={classes.actions}>
                <button type="button" onClick={props.onRemove}>
                  <span className="bi bi-dash-circle" />
                </button>
                <button type="button" onClick={props.onAdd}>
                  <span className="bi bi-plus-circle" />
                </button>
                {/* <button type="button" onClick={props.onRemove}>
                  <span className="bi bi-x-circle" />
                </button> */}
              </div>
            </div>
            <div className='col-5'>
              <h2>{props.name}</h2>
            </div>
            <div className='col-5'>
              <div className={classes.summary}>
                <span className={classes.price}>{price}</span>
                <span className={classes.amount}>x{props.quantity}</span>
                <span className={classes.price}>{total}</span>
              </div>
            </div>
          </div>
        </li>
    </Fragment>
  )
};

export default MerchandiseCartItem;

/*
<Fragment>
      {props.price &&
        <li className={classes['cart-item']}>
          <div className='row'>
            <div className='col'>
              
            </div>
          </div>
          <div>
            <h2>{props.name}</h2>
            <div className={classes.summary}>
              <span className={classes.price}>{`$ ${props.price.toFixed(2)}`}</span>
              <span className={classes.amount}>x {props.quantity}</span>
              <span className={classes.price}>{`$ ${props.price * props.quantity}`}</span>
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
* */