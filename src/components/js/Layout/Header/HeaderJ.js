import { Fragment } from 'react';
import imgi from '../../../../assets/logo.svg';
import HeaderCartButtonJ from '../HeaderCartButton/HeaderCartButtonJ';
import classes from './Header.module.css'
const HeaderJ = props => {
    return (
    <Fragment>
        <header className={classes.header}>
            <h1>Merchandise</h1>
            <HeaderCartButtonJ onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={imgi} alt='stock logo'/>
        </div>
    </Fragment>
    );
};

export default HeaderJ;