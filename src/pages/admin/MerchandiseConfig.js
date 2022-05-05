import { Fragment, useEffect, useState } from "react";
import RegisterMerchandise from "./RegisterMerchandise";
import RegisterNewMerchandise from "./RegisterNewMerchandise";
import { fetchMerchandiseData } from '../../store/redux/action/MerchandiseAction';
//import { CardJ } from '../../components/js/UI/CardJ';
import CardJ from "../../components/js/UI/CardJ";
import { useSelector, useDispatch } from 'react-redux';
import ItemU from '../../components/js/MerchandiseR/Item/ItemU';
import { toggle } from "../../store/redux/slice/UISlice";
import { yieldCurrentItem } from "../../store/redux/slice/MerchandiseSlice";
import { Link, Navigate, Route, Routes } from "react-router-dom";
//import { ServerURL } from "../../constraint/ServerURL";

const MerchandiseConfig = (props) => {
    window.sessionStorage.setItem("window", window.location.pathname)
    const [newItem, setNewItem] = useState(false);
    const dispatch = useDispatch();
    const merchandisel = useSelector(state => state.merchandise.merchandise);
    const toggleModal = useSelector(state => state.ui.cartToggle);
    const token = window.sessionStorage.getItem("token")
    const fetchMerchandise = async () => {
            console.log("fetching merchandise")
        dispatch(fetchMerchandiseData(token));
    };
    useEffect(() => {
        if (merchandisel.length == 0) {
            console.log(merchandisel.length)
            fetchMerchandise();
        }
    }, []);

    const modalToggle = () => {
        dispatch(toggle());
    };

    const addNewMerchandiseHandler = () => {
        setNewItem(true)
        modalToggle();
        const selecteditem = {
            cartuid: null,
            id: null,
            name: null,
            description: null,
            price: null,
            uid: null,
            iref: null,

        };
        dispatch(yieldCurrentItem(selecteditem));
    };

    const merchandiseList = merchandisel.map((merchandise) => (
        <ItemU
            id={merchandise.id}
            key={merchandise.id}
            name={merchandise.name}
            description={merchandise.description}
            price={merchandise.price}
            quantity={merchandise.quantity}
            uid={merchandise.uid}
            iref={merchandise.iref}
            active={merchandise.active}
            setNewItem={setNewItem}
        //bloburl={generateBlobFromURL.bind(null, `${ServerURL}/assets/media/merchandise/${merchandise.uid}/i.png`)}
        />
    ));
    return (
        <Fragment>
            {!props.authenticated && <Navigate to="/" />}
            <Routes>
                <Route path="edit/:idkey" element={<MerchandiseConfig authenticated={props.authenticated} />} />
            </Routes>
            {toggleModal && <RegisterMerchandise setNewItem={setNewItem} newItem={newItem} onClose={modalToggle} />}
            <CardJ>
                <Link to={`/merchandise/new`}>
                    <button className="w-100 btn btn-lg btn-dark" type="button">
                        <span className="bi bi-cloud-plus"></span>
                        Register New Merchandise
                    </button>
                </Link>
                <button className="w-100 btn btn-lg btn-success" type="button" onClick={addNewMerchandiseHandler}>
                    <span className="bi bi-cloud-plus"></span>
                    Add New Merchandise
                </button>
            </CardJ>
            <CardJ>
                {merchandiseList}
            </CardJ>
            <CardJ>
                <div>
                    <span className="bi bi-gear" style={{ fontSize: "5rem" }} />
                    <br />
                </div>
            </CardJ>
        </Fragment>
    )
};
export default MerchandiseConfig;
    /*const generateBlobFromURL = async(url) => {
const blobpart = [url];
const blob = new Blob(blobpart, { type:"application/octet-binary" });//mime type
const urlobj = URL.createObjectURL(blob);
console.log(`bloburl:${urlobj}`)
const reader = new FileReader();
reader.readAsDataURL(blob);
console.log(`reader:${reader.result}`);
//return reader.result;
return urlobj;
};*/