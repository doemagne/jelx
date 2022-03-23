import { useDispatch, useSelector } from 'react-redux';
import WCard from '../UI/WCard'; 
import classes from './ProductItem.module.css';
import { addItemToCart, replaceCart } from '../../store/slice/WHCartSlice';

const ProductItem = (props) => {
  const { id, name, price, description } = props;
  const dispatch = useDispatch();
  //logic  
  const cart = useSelector(state => state.whcart);

  const addToCartHandler = () => {
    //logic
    const newTotalQuantity = cart.totalItems + 1;
    const updatedItems = cart.items.slice();//copy array data
    const existingItem = updatedItems.find(item => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem };
      updatedItem.quantity++;
      updatedItem.total += price;
      const existingItemIndex = updatedItems.findIndex(item => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id:id,
        price:price,
        quantity:1,
        total: price,
        name: name,
      });
    }
    //logic
    const newCart = {
      totalItems:newTotalQuantity,
      items: updatedItems,
    };
    dispatch(replaceCart(newCart));
    /*//send http request here
      fetch('db-url', { method: 'POST', body: json.stringify(newCart) })

    //dispatch(addItemToCart({id,name,price,description}));

     */
    //old logic
    //dispatch(addItemToCart({id,name,price,description}));
  };

  return (
    <li className={classes.item}>
      <WCard>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </WCard>
    </li>
  );
};

export default ProductItem;
