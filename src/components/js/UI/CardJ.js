import { Fragment } from "react";
import classes from './Card.module.css';

const CardJ = props => {
    return (
        <Fragment>
            <div className={classes.card}>
                {props.children}               
            </div>
        </Fragment>
    );
};

export default CardJ;