import { Fragment } from "react";
import Banner from "../components/js/UI/Banner/Banner";
import Caption from "./admin/table/view/Caption";

const SignOut = () => {
    return (
        <Fragment>
            <Caption caption="You are now signed out."/>
            <Banner banner={"door-closed"} />
        </Fragment>
    )
}

export default SignOut;