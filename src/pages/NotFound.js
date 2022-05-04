import { Fragment } from "react";
import CardJ from "../components/js/UI/CardJ";

const NotFound = () => {
    return (
        <Fragment>
            <CardJ>
                <div>
                    <h1>404. Page not found.</h1>
                </div>
            </CardJ>
            <CardJ>
                <div>
                    <br/>
                    <span className="bi bi-question-circle" style={{ fontSize: "5rem" }} />
                    <span className="bi bi-hypnotize" style={{ fontSize: "5rem" }} />
                    <br />
                </div>
            </CardJ>
        </Fragment>
    )
}
export default NotFound;