import { Fragment } from "react";
import AvailableMerchandiseJ from "./MerchandiseAvailableJ";
import classes from './MerchandiseSummary.module.css';

const MerchandiseSummary = () => {
    return (
    <Fragment>
        <section className={classes.summary}>
            <h2>
                High Quality & Affordable Merchandise, Delivered To You.  
            </h2>
            <p>
                Choose your preferred items from our broad selection of available merchandise, sold at an affordable price. 
            </p>
            <p>
                All items are tested & conducted for approval before packaging, ensuring that only genuine & quality approved items are sold.
            </p>
            <p>
                If you are unsatisfied with the condition of any delivered items, we will guarentee refundable purchase or replacement of damaged goods within 7 days.
            </p>
        </section>
    </Fragment>
    );
};

export default MerchandiseSummary;