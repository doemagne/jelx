import './Navigation.module.css';
import React, { Fragment, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import NavAuthBar from './NavAuthBar';
import AnonymousBar from './Anonymous/AnonymousBar';
import Anonymous from './Anonymous/Anonymous';
import AuthLogout from './AuthLogout';
import SearchBar from './Anonymous/SearchBar';
import BrandBar from './BrandBar';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser } from '../../../store/redux/action/userAction';
import Notification from '../../js/UI/Notification/Notification';
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
        dispatch(signoutUser());
    }
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
                <Link to="/merchandise/register" className='nav-link active' aria-current="page">
                    <span className="bi bi-gear" />
                </Link>
                <Link to="/account/signout" className="nav-link active" aria-current="page" onClick={signoutHandler}>
                    <span className="bi bi-door-closed" />
                </Link>
            </Nav>
        );
    } else {
        navigation = (
            <Nav>
                <Link to="/" className='nav-link active' aria-current="page" >
                    <span className="bi bi-house" />
                </Link>
                <Link to="/account/signinN" className="nav-link active" aria-current="page">
                    <span className="bi bi-door-open" />
                </Link>
                <Link to="/account/signupN" className="nav-link active" aria-current="page" >
                    <span className="bi bi-person-lines-fill" />
                </Link>
            </Nav>
        );
    }
    return (
        <Fragment>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        {!loadstate ?  navigation: navigationloading }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default Navigation;

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