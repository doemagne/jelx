import { Fragment } from 'react';
import imgi from '../../../../assets/logo.svg';
import HeaderCartButtonR from '../HeaderCartButton/HeaderCartButtonR';
import classes from './Header.module.css'
const HeaderR = props => {
    return (
    <Fragment>
        <header className={classes.header}>
            <h1>Merchandise</h1>
            <HeaderCartButtonR onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={imgi} alt='stock logo'/>
        </div>
    </Fragment>
    );
};

export default HeaderR;