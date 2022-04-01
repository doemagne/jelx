import { Link } from 'react-router-dom';
const AnonymousBar = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link to="/account/signinN" className="nav-link active" aria-current="page">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to="/account/signupN" className="nav-link active" aria-current="page" >Sign Up</Link>
            </li>
        </ul>
    );
}

export default AnonymousBar;
/*

            <li className="nav-item">
                <Link to="/account/signin" className="nav-link active" aria-current="page">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to="/account/signup" className="nav-link active" aria-current="page" >Sign Up</Link>
            </li>
*/