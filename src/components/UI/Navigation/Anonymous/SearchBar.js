//import { Link, Redirect } from 'react-router-dom';
const SearchBar = () => {
    return (
        <form className="d-flex">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group" style={{"width":"20%"}}>
                <div className="input-group-prepend">
                    <button className="btn btn-secondary" type="button">
                        <span className="bi bi-search badge-dark"/>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchBar;