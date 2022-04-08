import './Navigation.module.css';
import React, { Fragment, useState } from 'react';
//import { Navigate } from 'react-router';
import NavAuthBar from './NavAuthBar';
import AnonymousBar from './Anonymous/AnonymousBar';
import Anonymous from './Anonymous/Anonymous';
import AuthLogout from './AuthLogout';
import SearchBar from './Anonymous/SearchBar';
import BrandBar from './BrandBar';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../store/redux/action/userAction';
//import { signout } from '../../../store/slice/AuthSlice';
let nav;
let menu = (<AnonymousBar />);
let leftmenu = (<Anonymous />);
let searchform = (<SearchBar />);
const Nav = (props) => {
    const dispatch = useDispatch();

    const signouHandler = async (e) => {
        e.preventDefault();
        dispatch(signoutUser());
    }
    if (props.authenticated) {
        leftmenu = (<NavAuthBar />);
        menu = (<AuthLogout onClick={signouHandler} />);
    } else {
        console.log(`Rerunning Asyncronous SideEffect => `);
        leftmenu = (<Anonymous />);
        menu = (<AnonymousBar />);
        //return <Navigate to="/"/>
    }

    nav = (
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
    );
    return (
        <Fragment>
            {nav}
        </Fragment>
    );
}

export default Nav;

/*
 
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