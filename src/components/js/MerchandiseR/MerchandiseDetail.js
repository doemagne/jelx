import { useParams } from "react-router-dom";
import CardJ from "../UI/CardJ";

const MerchandiseDetail = () => {
    window.sessionStorage.setItem("window", window.location.pathname)
    const params = useParams();
    console.log(params.uid);
    return (<section>
        <CardJ>
        <h1>Merchandise Details</h1>
        </CardJ>
    </section>)
}

export default MerchandiseDetail;