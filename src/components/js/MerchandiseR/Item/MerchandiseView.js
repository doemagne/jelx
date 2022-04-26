import classes from "./MerchandiseView.module.css";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardJ from '../../UI/CardJ';
import ModalJ from '../../UI/ModalJ';
import { ServerURL } from '../../../../constraint/ServerURL';
//import { setloading } from "../../../../store/redux/slice/UISlice";
import InputJ from "../../UI/InputJ";
const MerchandiseView = (props) => {
    const [imgSrc, setImgSrc] = useState('');
    //const dispatch = useDispatch();
    const currentItem = useSelector(state => state.merchandise.currentItem);
    //const nameref = useRef();
    const quantityref = useRef();
    //const uidref = useRef();
    //const priceref = useRef();
    //const descriptionref = useRef();
    const imageref = useRef();
    const price = `Price: $${currentItem.price.toFixed(2)} / item`;

    const submitHandler = async (e) => {
    };
    const imageViewHandler = () => {
        //for (const f of imageref.current.files){f}
        if (props.newItem) {
            window.open(imgSrc, '_blank').focus();
        } else {
            window.open(`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`, '_blank').focus();
        }
    };

    return (
        <ModalJ>
            <main>
                <CardJ>
                    <div className={classes.imgcarry}>
                        <h1 className="h3 mb-3 fw-normal">{currentItem.name}</h1>
                    </div>
                </CardJ>
                <form onSubmit={submitHandler}>
                    <CardJ>
                        <div className="row">
                            <div className="col-sm">
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <div className={classes.imgcarry}>
                                            {
                                                !props.newItem &&
                                                <CardJ>
                                                    <img src={`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`} id="photo" onClick={imageViewHandler} />
                                                </CardJ>
                                            }
                                            {
                                                props.newItem &&
                                                <CardJ>
                                                    <img src={imgSrc} id="photo" onClick={imageViewHandler} />
                                                </CardJ>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <InputJ
                                            ref={quantityref}
                                            label={`Quantity`}
                                            input={{
                                                id: 'quantity',
                                                type: 'number',
                                                min: '1',
                                                max: '50',
                                                step: '1',
                                                defaultValue: '1'
                                            }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn btn-default btn-danger">
                                        <span className="bi bi-coin"></span>
                                        {price}
                                    </button>
                                </div>
                                <div className="row">
                                    <button type="button" className="btn btn-success">
                                        <span className="bi bi-minecart-loaded"></span>
                                        Available:
                                        <span className="badge badge-light">
                                            87
                                        </span>
                                    </button>
                                </div>
                                <div className="row">
                                    <button type="button" className="btn btn-primary">
                                        <span className="bi bi-star"></span>
                                        Add to wish list
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-floating form-fl`}>
                                <br />
                                <div className={classes.description}>{currentItem.description}</div>
                            </div>
                        </div>
                    </CardJ>
                    <div className="row">
                        <div className="col-sm">
                            <CardJ>
                                <button className="w-100 btn btn-lg btn-danger" type="button" onClick={props.onClose}>
                                    <span className="bi bi-x-circle-fill"></span>
                                    Close
                                </button>
                            </CardJ>
                        </div>
                        <div className="col-sm">
                            <CardJ>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">
                                    <span className="bi bi-cart-plus-fill"></span>
                                    Add to cart
                                </button>
                            </CardJ>
                        </div>
                    </div>
                </form>
            </main >
        </ModalJ >
    );

};

//<p className="mt-5 mb-3 text-muted">&copy; 2022</p>

export default MerchandiseView;
    /*const removeHandler = () => {
let confirmation = "This item will be removed from the merchandise list. Are you sure you want to proceed?";
let removal = window.confirm(confirmation, "Are you sure");
if (removal) {
props.onClose()
alert("The item has been removed successfully");
}
props.setNewItem(false);

};
const ImageSrcHandler = () => {
setImgSrc(URL.createObjectURL(imageref.current.files[0]));
};*/
/*
const submitHandler = () => {

    dispatch(setloading(true));
    e.preventDefault();
    const itemdata = {
        name: nameref.current.value,
        price: priceref.current.value,
        description: descriptionref.current.value,
        uid: uidref.current.value,
    };
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 5000);
    const formdata = new FormData();
    formdata.append("merchandise", JSON.stringify(itemdata));
    formdata.append("photo", imageref.current.files[0]);
    //dispatch(uploadMerchandiseData(formdata));
    try {
        const stimulus = await fetch(ServerURL + '/api/merchandise/upload', {
            method: 'POST',
            body: formdata,
            signal: ctrl.signal,
        });
        console.log(stimulus.status);
    } catch (error) {
        console.log("An error occured when uploading the form data.", error);
    }
    //console.log(props);
    props.setNewItem(false);
    props.onClose();
    dispatch(setloading(false));
};*/