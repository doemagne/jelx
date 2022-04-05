import { Fragment, useEffect, useState } from "react";
import RegisterMerchandise from "./RegisterMerchandise";
import { fetchMerchandiseData } from '../../store/redux/action/MerchandiseAction';
//import { CardJ } from '../../components/js/UI/CardJ';
import CardJ from "../../components/js/UI/CardJ";
import { useSelector, useDispatch } from 'react-redux';
import ItemU from '../../components/js/MerchandiseR/Item/ItemU';
import { toggle } from "../../store/redux/slice/UISlice";
import { yieldCurrentItem } from "../../store/redux/slice/MerchandiseSlice";
//import { ServerURL } from "../../constraint/ServerURL";

const MerchandiseConfig = () => {
    const [newItem, setNewItem] = useState(false);
    const dispatch = useDispatch();
    const merchandisel = useSelector(state => state.merchandise.merchandise);
    const toggleModal = useSelector(state => state.ui.cartToggle);
    const fetchMerchandise = async () => {
        dispatch(fetchMerchandiseData());
    };
    useEffect(() => {
        if (merchandisel.length == 0) {
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
            uid={merchandise.uid}
            iref={merchandise.iref}
            setNewItem={setNewItem}
        //bloburl={generateBlobFromURL.bind(null, `${ServerURL}/assets/media/merchandise/${merchandise.uid}/i.png`)}
        />
    ));
    return (
        <Fragment>
            {toggleModal && <RegisterMerchandise setNewItem={setNewItem} newItem={newItem} onClose={modalToggle} />}
            <CardJ>
                <button className="w-100 btn btn-lg btn-success" type="button" onClick={addNewMerchandiseHandler}>Add New Merchandise</button>
            </CardJ>
            <CardJ>
                {merchandiseList}
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