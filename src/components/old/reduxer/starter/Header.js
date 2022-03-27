import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../../store/redux/slice/AuthSlice';
import classes from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.authenticated);
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={signoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )

      }
    </header>
  );
};

export default Header;
