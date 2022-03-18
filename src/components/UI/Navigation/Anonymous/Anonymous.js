import { Link } from 'react-router-dom';
const Anonymous = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">    |</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="/">    |</a>
            </li>
        </ul>
    );
}

export default Anonymous;