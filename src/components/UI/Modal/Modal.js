import { Fragment } from "react";
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
const BackdropJ = props => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}/>

    );
};

const ModalOverlayJ = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackdropJ onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlayJ>{props.children}</ModalOverlayJ>, portalElement)}    
        </Fragment>
    );
};

export default Modal;