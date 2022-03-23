import classes from './CartButton.module.css';
import { toggle } from '../../store/slice/WHUISlice';
import { useDispatch, useSelector } from 'react-redux';
const WCartButton = (props) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.whcart.totalItems)
  const toggleCartHandler = () => {
    dispatch(toggle());
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default WCartButton;
