import { useDispatch } from 'react-redux';
import WCard from '../UI/WCard';
import classes from './ProductItem.module.css';
import { addItemToCart } from '../../../../store/redux/slice/WHCartSlice';

const ProductItem = (props) => {
  const { id, name, price, description } = props;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemToCart({id,name,price,description}));
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
