//import { Link, Redirect } from 'react-router-dom';
const SearchBar = () => {
    return (
        <form className="d-flex">
            <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
}

export default SearchBar;