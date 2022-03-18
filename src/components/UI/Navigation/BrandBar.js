import { Link } from 'react-router-dom';
const BrandBar = () => {
    return (
        <>
            <Link to="/" className="navbar-brand">[ogo]</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </>
    );
}

export default BrandBar;