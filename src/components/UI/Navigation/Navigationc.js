import React, { Fragment, useState } from 'react';
//import { Navigate } from 'react-router';
import NavAuthBar from './NavAuthBar';
import AnonymousBar from './Anonymous/AnonymousBar';
import Anonymous from './Anonymous/Anonymous';
import AuthLogout from './AuthLogout';
import SearchBar from './Anonymous/SearchBar';
import BrandBar from './BrandBar';
import { ServerURL } from '../../../constraint/ServerURL';
import { useDispatch } from 'react-redux';
//import { signout } from '../../../store/slice/AuthSlice';
const Nav = (props) => {
    const [exited, setExited] = useState(false);
    const [error, setError] = useState({
        title: '',
        content: '',
    });
    const dispatch = useDispatch();


    const logout = async (e) => {
        props.setName('');
        setExited(true);
        e.preventDefault();
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
            props.setName('');
            setExited(true);
            return;

        }
    }

    let nav;
    let menu = (<AnonymousBar />);
    let leftmenu = (<Anonymous />);
    let searchform = (<SearchBar />);
    if (!props.name) {
        console.log(`Rerunning Asyncronous SideEffect => ${props.name}`);
        leftmenu = (<Anonymous />);
        menu = (<AnonymousBar />);
    } else {
        leftmenu = (<NavAuthBar />);
        menu = (<AuthLogout onClick={logout} />);
    }

    nav = (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <BrandBar />
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {leftmenu}
                    {searchform}
                </div>
                {menu}
            </div>
        </nav>
    );
    if (exited) {
        console.log("redirecting");
        return (
            <Fragment>
                {nav}
            </Fragment>
        );
    }


    return (
        <Fragment>
            {nav}
        </Fragment>
    );
}

export default Nav;