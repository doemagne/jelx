import { Fragment, useEffect, useState } from "react";
import { fetchMerchandiseData } from '../../store/redux/action/MerchandiseAction';
import CardJ from "../../components/js/UI/CardJ";
import { useSelector, useDispatch } from 'react-redux';
import ItemU from '../../components/js/MerchandiseR/Item/ItemU';
import { Link, Navigate, Route, Routes } from "react-router-dom";
//import { CardJ } from '../../components/js/UI/CardJ';
//import RegisterMerchandise from "./RegisterMerchandise";
//import RegisterNewMerchandise from "./RegisterNewMerchandise";
//import { ServerURL } from "../../constraint/ServerURL";
//import { toggle } from "../../store/redux/slice/UISlice";
//import { yieldCurrentItem } from "../../store/redux/slice/MerchandiseSlice";

const MerchandiseConfig = (props) => {
    //const [newItem, setNewItem] = useState(false);
    const dispatch = useDispatch();
    const merchandisel = useSelector(state => state.merchandise.merchandise);
    const currentItem = useSelector(state => state.merchandise.currentItem)
    //const toggleModal = useSelector(state => state.ui.cartToggle);
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
            //setNewItem={setNewItem}
        />
    ));
    window.sessionStorage.setItem("window", window.location.pathname)
    return (
        <Fragment>
            {!props.authenticated && <Navigate to="/" />}
            <Routes>
                <Route path="edit/:idkey" element={<MerchandiseConfig authenticated={props.authenticated} />} />
            </Routes>
            <CardJ>
                <Link to={`/merchandise/new`}>
                    <button className="w-100 btn btn-lg btn-dark" type="button">
                        <span className="bi bi-cloud-plus"></span>
                        Register New Merchandise
                    </button>
                </Link>
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
            //{toggleModal && <RegisterMerchandise setNewItem={setNewItem} newItem={newItem} onClose={modalToggle} />}
/*
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
 
            <button className="w-100 btn btn-lg btn-success" type="button" onClick={addNewMerchandiseHandler}>
                <span className="bi bi-cloud-plus"></span>
                Add New Merchandise
            </button>
const generateBlobFromURL = async(url) => {
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