import MerchandiseSummary from "./MerchandiseSummaryJ";
import AvailableMerchandiseJ from "./MerchandiseAvailableJ";
import { Fragment } from "react";

const MerchandiseJ = () => {
    return (
    <Fragment>
        <MerchandiseSummary/>
        <AvailableMerchandiseJ/>
    </Fragment>
    );
};

export default MerchandiseJ;