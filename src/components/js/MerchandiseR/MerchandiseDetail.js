import { Link, Route, Routes, useParams } from "react-router-dom";
import CardJ from "../UI/CardJ";
import Comments from '../UI/Comment/Comments';
const MerchandiseDetail = () => {
    window.sessionStorage.setItem("window", window.location.pathname)
    const params = useParams();
    console.log(params.idkey);
    return (
    <section>
        <CardJ>
        <h1>Merchandise Details</h1>

        </CardJ>



        <CardJ>
        <Link to={`comments`} className='nav-link active' aria-current="page" >
            <span className="bi bi-chat-left-text" />
        </Link>
        </CardJ>
        <Routes>
            <Route path={`comments`} element={<Comments/>} />
        </Routes>
        <CardJ>
            <div>
                <br/>
                <span className="bi bi-chat-right-text" style={{ fontSize: "5rem" }} />
                <br />
            </div>
        </CardJ>
    </section>
    )
}
            //<Route path={`/merchandise/detail/${params.idkey}/comments`} element={<Comments/>} />
        //<Link to={`/merchandise/detail/${params.idkey}/comments`} className='nav-link active' aria-current="page" >

        //<Comments></Comments>
//<Route path={`/merchandise/cartr/${params.key}/comments`} element={<Comments/>} />
export default MerchandiseDetail;