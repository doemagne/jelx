import { Link } from 'react-router-dom';
const AuthLogout = (props) => {

    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
            <Link to="/account/signout" className="nav-link active" aria-current="page" onClick={props.onClick}>Sign Out</Link>
            </li>
        </ul>
    );
}

export default AuthLogout;