import React from "react";
import { Link } from 'react-router-dom';
import DropDownBar from "./DropDownBar";
const NavAuthBar = () => {
    const dropDrownHandler = () => {

    };
    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" >
                    <span className="bi bi-house" />
                    </Link>
            </li>
            <li className="nav-item">
                <Link to="/account/user" className="nav-link active" aria-current="page">
                    <span className="bi bi-person-circle" />
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/merchandise/cartr" className="nav-link active" aria-current="page">
                    <span className="bi bi-cart" />
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/merchandise/register" className="nav-link active" aria-current="page">
                    <span className="bi bi-gear" />
                </Link>
            </li>
        </ul>
    );
}

export default NavAuthBar;
/*
            <DropDownBar navHandler={dropDrownHandler} />

        <li className="nav-item">
        <Link to="/account/journal" className="nav-link active" aria-current="page">Journal</Link>
        </li>
        <li className="nav-item">
        <Link to="/account/memo" className="nav-link active" aria-current="page">Memo</Link>
        </li>
        <li className="nav-item">
        <Link to="/account/stock" className="nav-link active" aria-current="page">Stock</Link>
        </li>
        <li className="nav-item">
        <Link to="/account/counter" className="nav-link active" aria-current="page">Counter</Link>
        </li>
        <li className="nav-item">
        <Link to="/account/todos" className="nav-link active" aria-current="page">To Dos</Link>
        </li>
        <li className="nav-item">
        <Link to="/account/tasks" className="nav-link active" aria-current="page">Tasks</Link>
        </li>
*/