import { Fragment } from 'react';
import { Link } from 'react-router-dom';
const BrandBar = () => {
    return (
        <Fragment>
            <Link to="/" className="navbar-brand">
                <span className="bi bi-apple" />
            </Link>
        </Fragment>
    );
}

export default BrandBar;
/*
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            */