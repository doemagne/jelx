//import { Link, Redirect } from 'react-router-dom';
const SearchBar = () => {
    return (
        <form className="d-flex">
            <input className="form-control btn-dark" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group" style={{"width":"20%"}}>
                <div className="input-group-prepend">
                    <button className="btn btn-dark" type="button" style={{"right":"6%"}}>
                        <span className="bi bi-search"/>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchBar;