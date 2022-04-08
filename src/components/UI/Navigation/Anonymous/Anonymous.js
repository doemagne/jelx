import { Link } from 'react-router-dom';
const Anonymous = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                    <span className="bi bi-house"></span>
                </Link>
            </li>
        </ul>
    );
}

export default Anonymous;
/*

            <li className="nav-item">
                <a className="nav-link" href="/">    |</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="/">    |</a>
            </li>
*/