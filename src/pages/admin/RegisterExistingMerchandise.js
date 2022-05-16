import classes from "./RegisterMerchandise.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL } from '../../constraint/ServerURL';
import { setloading } from "../../store/redux/slice/UISlice";
import CardJ from "../../components/js/UI/CardJ";
import Field from "../../components/js/UI/Field/Field";
import FieldArea from "../../components/js/UI/Field/FieldArea";
import { Navigate, useNavigate } from "react-router-dom";
import Banner from "../../components/js/UI/Banner/Banner";
import { updateMerchandise, updateMerchandiseItem } from "../../store/redux/slice/MerchandiseSlice";
import { delayRequest } from "../../store/redux/action/Request";
//import { registerMerchandiseData } from "../../store/redux/action/MerchandiseAction";
const RegisterExistingMerchandise = (props) => {
    const currentItem = useSelector(state => state.merchandise.currentItem);
    const navigator = useNavigate();
    const [imgSrc, setImgSrc] = useState('#');
    const dispatch = useDispatch();
    const nameref = useRef();
    const uidref = useRef();
    const activeref = useRef();
    const quantityref = useRef();
    const priceref = useRef();
    const descriptionref = useRef();
    const imageref = useRef();
    window.sessionStorage.setItem("window", window.location.pathname)
    const token = window.sessionStorage.getItem("token")

    const deactivateMerchandiseHandler = async (e) => {
        dispatch(setloading(true));
        e.preventDefault();
        const itemdata = {
            uid: uidref.current.value,
        };
        const stimulus = await fetch(ServerURL + '/api/merchandise/deactivate', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(itemdata),
            credentials: "include",
        });
        console.log(stimulus.status);
        dispatch(setloading(false));

    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const itemdata = {
            name: nameref.current.value,
            price: priceref.current.value,
            quantity: quantityref.current.value,
            description: descriptionref.current.value,
            uid: currentItem.uid,//uidref.current.value,
            //uid: uidref.current.value,
            active: activeref.current.value,
        };
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 5000);
        const formdata = new FormData();
        formdata.append("merchandise", JSON.stringify(itemdata));
        formdata.append("photo", imageref.current.files[0]);
        try {
            const stimulus = await fetch(ServerURL + '/api/merchandise/register/existing', {
                method: 'PUT',
                headers: {
                    "X-Csrf-Token": token
                },
                body: formdata,
                signal: ctrl.signal,
                credentials: "include",
            });
            console.log(stimulus.status);
            const response = await stimulus.json()
            dispatch(updateMerchandiseItem(response));
        } catch (error) {
            console.log("An error occured when uploading the form data.", error);
        }
        cancelHandler()
        dispatch(setloading(false));
    };
    const ImageSrcHandler = () => {
        setImgSrc(`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`);
        if (imageref.current.files.length > 0) {
            setImgSrc(URL.createObjectURL(imageref.current.files[0]));
        }
    };
    const imageViewHandler = () => {
        window.open(imgSrc, '_blank').focus();
    };
    const cancelHandler = () => {
        navigator("/merchandise/register")
    }

    useEffect(() => {
        delayRequest(500)
        if (!currentItem) {
            delayRequest(500)
            //cancelHandler()
        }
    }, [])
    return (
        <Fragment>
            {!props.authenticated && (<Navigate to="/" />)}
            (<CardJ>
                <div className={classes.imgcarry}>
                    <h1 className="h3 mb-3 fw-normal">Edit Existing Merchandise</h1>
                </div>
            </CardJ>
            {currentItem && (
            <form onSubmit={submitHandler}>
                <CardJ>
                    <div className="row">
                        <div className="col">
                            <button className="w-100 btn btn-lg btn-danger" type="button" onClick={deactivateMerchandiseHandler}>
                                <span className="bi bi-trash3-fill"></span>
                            </button>
                        </div>
                        <div className="col">
                            <button className="w-100 btn btn-lg btn-warning" type="button" onClick={cancelHandler}>
                                <span className="bi bi-x-lg" />
                            </button>
                        </div>
                        <div className="col">
                            <button className="w-100 btn btn-lg btn-primary" type="submit">
                                <span className="bi bi-cloud-upload-fill" />
                            </button>
                        </div>
                    </div>
                </CardJ>
                <CardJ>
                    <div className="row">
                        <div className="col-sm">
                            <div className="row">
                                <Field ref={nameref} icon="tag" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Item Name', required: true, defaultValue: currentItem.name }} />
                            </div>
                            <div className="row">
                                <Field ref={quantityref} icon="boxes" input={{ className: 'form-control', type: 'number', step: "1", id: 'quantity', placeholder: 'Quantity', required: true, defaultValue: currentItem.quantity }} />
                            </div>
                            <div className="row">
                                <Field ref={priceref} icon="currency-dollar" input={{ className: 'form-control', type: 'number', step: "0.01", id: 'price', placeholder: 'Price', required: true, defaultValue: currentItem.price }} />
                            </div>
                            <div className="row">
                                <FieldArea ref={descriptionref} icon="chat-right-text" textarea={{ className: 'form-control', type: 'text', id: 'description', placeholder: 'Description', required: true, defaultValue: currentItem.description }} />
                            </div>
                            <div className="row">
                                <Field ref={uidref} icon="link" input={{ className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', readOnly: true, defaultValue: currentItem.uid }} />
                            </div>
                            <div className="row">
                                <div className={classes.imgcarry}>
                                    <div className="input-group-text">
                                        <span className="bi bi-camera2"></span>
                                        <input ref={imageref} className="btn btn-default" id="image" placeholder="Image" type="file" required onChange={ImageSrcHandler} style={{ fontSize: "0.5rem", padding: "0rem .75rem" }}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row">
                                        <div className="form-floating form-fl">
                                            <div className="form-check form-switch">
                                                <input ref={activeref} className="form-check-input" id="active" type="checkbox" />
                                                <label className="form-check-label" htmlFor="active">Active</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="row">
                                <div className={`form-floating form-fl`}>
                                    <CardJ>
                                        <img className={`image-fluid`} src={imgSrc} id="photo" onClick={imageViewHandler} />
                                        <img className={classes.imgbackup} src={`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`} id="photop" onClick={imageViewHandler} />
                                    </CardJ>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardJ>
            </form>
            )}
            <Banner banner={'chat-right-text'} />
        </Fragment>
    )
}
export default RegisterExistingMerchandise;