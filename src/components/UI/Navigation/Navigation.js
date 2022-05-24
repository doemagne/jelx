import classes from './Navigation.module.css';
import './Navigation.module.css';
import React, { Fragment, useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AuthLogout from './AuthLogout';
import BrandBar from './BrandBar';
import { signoutUser } from '../../../store/redux/action/userAction';
import SearchBar from './Anonymous/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import Anonymous from './Anonymous/Anonymous';
//import { Navigate } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../js/UI/Notification/Notification';
import NavAuthBar from './NavAuthBar';
import AnonymousBar from './Anonymous/AnonymousBar';
// import classes from '../../js/Layout/HeaderCartButton/HeaderCartButton.module.css'
//import { signout } from '../../../store/slice/AuthSlice';
let nav;
let navigation;
let navigationloading;
let menu = (<AnonymousBar />);
let leftmenu = (<Anonymous />);
let searchform = (<SearchBar />);
const Navigation = (props) => {
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();
    const loadstate = useSelector(state => state.ui.loadstate)
    const signoutHandler = async (e) => {
        e.preventDefault();
        window.sessionStorage.setItem("window", "/");
        dispatch(signoutUser());
    }
    const currwindow = window.location.pathname
    const navigator = useNavigate()
    const cartCtx = useSelector(state => state.cart);
    const { items } = cartCtx;
    const [btnHigh, setBtnHigh] = useState(false);

    const buttonClasses = `${classes.button} ${btnHigh ? classes.bump : ''}`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHigh(true);
        const timer = setTimeout(() => {
            setBtnHigh(false);
        }, 290);

        //console.log(items.length);
        return () => {
            clearTimeout(timer);
        };

    }, [items]);
    navigationloading =
        (<Nav>
            <Link to="#" className='nav-link active' aria-current="page" >
                <span className="bi bi-house" />
            </Link>
        </Nav>)

    //return<>{nav}</>
    if (props.authenticated) {
        navigation = (
            <Nav>
                <Link to="/" className='nav-link active' aria-current="page" >
                    <span className="bi bi-house" />
                </Link>
                <Link to="/account/user" className='nav-link active' aria-current="page">
                    <span className="bi bi-person-circle" />
                </Link>
                <Link to="/merchandise/cartr" className='nav-link active' aria-current="page">
                    <span className="bi bi-cart" />
                </Link>
                <Link to="/merchandise/cart" >
                    <button className={`${buttonClasses} nav-link active text-center`} onClick={() => { }}>
                        <span className={classes.button}>{cartCtx.totalItems}</span>
                    </button>
                </Link>
                <Link to="/system/config" className='nav-link active' aria-current="page">
                    <span className="bi bi-gear" />
                </Link>
                <Link to="/sensor/telemetry" className='nav-link active' aria-current="page" >
                    <span className="bi bi-thermometer-sun" />
                </Link>
                <Link to="/camera/feed" className='nav-link active' aria-current="page" >
                    <span className="bi bi-camera-reels" />
                </Link>
                <Link to="/bug/mapping" className='nav-link active' aria-current="page" >
                    <span className="bi bi-bug" />
                </Link>
                <Link to="/account/signout" className="nav-link active" aria-current="page" onClick={signoutHandler}>
                    <span className="bi bi-door-closed" />
                </Link>
            </Nav>
        );
        {/* <Link to="/merchandise/register" className='nav-link active' aria-current="page"> */ }

    } else {
        navigation = (
            <Nav>
                <Link to="/" className='nav-link active' aria-current="page" >
                    <span className="bi bi-house" />
                </Link>
                <Link to="/account/signin" className="nav-link active" aria-current="page">
                    <span className="bi bi-door-open" />
                </Link>
                <Link to="/account/signup" className="nav-link active" aria-current="page" >
                    <span className="bi bi-person-lines-fill" />
                </Link>
            </Nav>
        );
    }
    const configpath = currwindow === "/system/config" | currwindow.includes("mapping")
    if (props.authenticated && configpath) {
        navigation = (
            <Nav>
                <Link to="/" className='nav-link active' aria-current="page" >
                    <span className="bi bi-house" />
                </Link>
                <Link to="/user/profile/mapping" className='nav-link active' aria-current="page">
                    <span className="bi bi-person-circle" />
                </Link>
                <Link to="/user/address/mapping" className='nav-link active' aria-current="page">
                    <span className="bi bi-signpost" />
                </Link>
                <Link to="/cart/order/mapping" className='nav-link active' aria-current="page">
                    <span className="bi bi-cart" />
                </Link>
                <Link to="/merchandise/mapping" className='nav-link active' aria-current="page">
                    <span className="bi bi-boxes" />
                </Link>
                <Link to="/bug/mapping" className='nav-link active' aria-current="page" >
                    <span className="bi bi-bug" />
                </Link>
                <Link to="/notification/mapping" className='nav-link active' aria-current="page" >
                    <span className="bi bi-bell" />
                </Link>
            </Nav>
        )

    }
    return (
        <Fragment>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        {!loadstate ? navigation : navigationloading}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default Navigation;
    /*if (props.authenticated) {
leftmenu = (<NavAuthBar />);
menu = (<AuthLogout onClick={signouHandler} />);
} else {
console.log(`Rerunning Asyncronous SideEffect => `);
leftmenu = (<Anonymous />);
menu = (<AnonymousBar />);
//return <Navigate to="/"/>
}*/
/*nav = (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            <BrandBar />
            <div className="collapse navbar-collapse" id="navbarCollapse">
                {leftmenu}
                {props.authenticated && searchform}
            </div>
            {menu}
        </div>
    </nav>
);*/

/*
                {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
 
//const [exited, setExited] = useState(false);
/const [error, setError] = useState({
title: '',
content: '',
});/
if (exited) {
console.log("redirecting");
return (
    <Fragment>
        {nav}
    </Fragment>
);
}
props.setName('');
setExited(true);
try {
    await fetch(ServerURL + '/api/signout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //"Access-Control-Allow-Origin": "*"
        },
        credentials: "include",
    });
    window.location.reload();
    return;
} catch (e) {
    if (e instanceof Error) {
        setError({
            title: "An error occured.",
            content: `The system encountered an unexpected error:[${e}] Please try again later.`,
        });
        console.log(error);
    }
    //props.setName('');
    setExited(true);
    return;*/