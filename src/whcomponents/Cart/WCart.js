import WCard from '../UI/WCard';
import classes from './Cart.module.css';
import CartItem from './WCartItem';
import { useSelector } from 'react-redux';

const WCart = (props) => {
  const cartItems = useSelector(state => state.whcart.items);
  return (
    <WCard className={classes.cart}>
      <h2>Your Shopping Cart {props.cuid}</h2>
      <ul>
        {cartItems.map(item => (
          <CartItem  
            key={item.id} 
            item={{
              id: item.id, 
              name: item.name, 
              quantity: item.quantity, 
              total: item.total, 
              price: item.price 
            }}
          />
        ))}

      </ul>
    </WCard>
  );
};

export default WCart;
