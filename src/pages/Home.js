import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CardJ from "../components/js/UI/CardJ";

const Home = () => {
  const authenticated = useSelector(state => state.user.authenticated)
  const currentwindow = window.sessionStorage.getItem("window")
    return (
        <Fragment>
        {authenticated && <Navigate to={currentwindow} />}
            <CardJ>
                <div>
                    <span className="bi bi-house" style={{ fontSize: "5rem" }} />
                    <br />
                </div>
            </CardJ>
        </Fragment>
    )
}

export default Home;