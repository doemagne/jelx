import React, { Fragment, useState } from 'react';
//import { Navigate } from 'react-router';
import NavAuthBar from './NavAuthBar';
import AnonymousBar from './Anonymous/AnonymousBar';
import Anonymous from './Anonymous/Anonymous';
import AuthLogout from './AuthLogout';
import SearchBar from './Anonymous/SearchBar';
import BrandBar from './BrandBar';
import ServerURL from '../../../constraint/ServerURL';
//import { useCallback } from 'react';
const Nav = (props) => {
    const [exited, setExited] = useState(false);
    const [error, setError] = useState({
        title: '',
        content: '',
    });
    const logout = async (e) => {
    //const logout = useCallback( async (e: SyntheticEvent) => {
        props.setName('');
        setExited(true);
        e.preventDefault();
        try {
            //await fetch("http://pecan.local:2023/api/signout", {
            await fetch(ServerURL+'/api/signout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Access-Control-Allow-Origin": "*"
                },
                credentials: "include",
            });
            return;
        } catch (e) {
            //let result = (e as Error).message;
            if (e instanceof Error) {
                //result = (e as Error).message; // works, `e` narrowed to Error
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
 //   ,[props.name]);

    let nav;
    let menu = (<AnonymousBar />);
    let leftmenu = (<Anonymous />);
    let searchform = (<SearchBar />);
    //if (props.name === undefined || props.name === "") {
    if (!props.name) {
        console.log(`Rerunning Asyncronous SideEffect => ${props.name}`);
        leftmenu = (<Anonymous />);
        menu = (<AnonymousBar />);
    } else {
        //console.log(`Navigation Session: ${props.name}`);
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

                //{<Navigate to="/api/signout" />}
    //{<Navigate to="/account/signout" />}
    //{<Redirect to="/login" /> && <Redirect to="/logout" />}
    //{<Redirect to="/logout" />}
    return (
        <Fragment>
            {nav}
        </Fragment>
    );
}

export default Nav;

/*import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Front</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link active" aria-current="page">Sign In</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
*/