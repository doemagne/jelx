import CartButton from '../Cart/WCartButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {

  return (
    <header className={classes.header}>
      <h1>Merchandise</h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
