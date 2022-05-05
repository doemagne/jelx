import classes from "./RegisterMerchandise.module.css";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL } from '../../constraint/ServerURL';
import { setloading } from "../../store/redux/slice/UISlice";
import CardJ from "../../components/js/UI/CardJ";
import Field from "../../components/js/UI/Field/Field";
import FieldArea from "../../components/js/UI/Field/FieldArea";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/js/UI/Banner/Banner";
import { registerMerchandiseData } from "../../store/redux/action/MerchandiseAction";
const RegisterNewMerchandise = (props) => {
    //const [newImg, setNewImg] = useState(props.newItem);
    const navigator = useNavigate();
    const [imgSrc, setImgSrc] = useState('#');
    const dispatch = useDispatch();
    //const currentItem = useSelector(state => state.merchandise.currentItem);
    const nameref = useRef();
    const uidref = useRef();
    const activeref = useRef();
    const quantityref = useRef();
    const priceref = useRef();
    const descriptionref = useRef();
    const imageref = useRef();
    window.sessionStorage.setItem("window", window.location.pathname)
    const token = window.sessionStorage.getItem("token")
    const delay = (ms) => new Promise(res => setTimeout(res,ms))

    const submitHandler = async (e) => {
        e.preventDefault();
        //upload from data
        const itemdata = {
            name: nameref.current.value,
            price: priceref.current.value,
            quantity: quantityref.current.value,
            description: descriptionref.current.value,
            uid: uidref.current.value,
            active: activeref.current.value,
        };
        dispatch(registerMerchandiseData(itemdata, token))
        //upload media file

        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 5000);
        const formdata = new FormData();
        //formdata.append("merchandise", JSON.stringify(itemdata));
        formdata.append("photo", imageref.current.files[0]);
        try {
            await delay(200)
            console.log("delayed for 200 milliseconds")
            await delay(50)
            console.log("delayed for 50 milliseconds")
            
            //const stimulus = await fetch(ServerURL + '/api/merchandise/upload', {
            const stimulus = await fetch(ServerURL + '/api/merchandise/media/upload', {
                method: 'POST',
                headers: {
                    "X-Csrf-Token": token
                },
                body: formdata,
                signal: ctrl.signal,
                credentials: "include",
            });
            console.log(stimulus.status);
        } catch (error) {
            console.log("An error occured when uploading the form data.", error);
        }
        //console.log(props);
        //cancelHandler()
        dispatch(setloading(false));
    };

    const ImageSrcHandler = () => {
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

    return (
        <Fragment>
            <CardJ>
                <div className={classes.imgcarry}>
                    <h1 className="h3 mb-3 fw-normal">Add New Merchandise</h1>
                </div>
            </CardJ>
            <form onSubmit={submitHandler}>
                <CardJ>
                    <div className="row">
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
                                <Field ref={nameref} icon="tag" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Item Name', required: true }} />
                            </div>
                            <div className="row">
                                <Field ref={quantityref} icon="boxes" input={{ className: 'form-control', type: 'number', step: "1", id: 'quantity', placeholder: 'Quantity', required: true }} />
                            </div>
                            <div className="row">
                                <Field ref={priceref} icon="currency-dollar" input={{ className: 'form-control', type: 'number', step: "0.01", id: 'price', placeholder: 'Price', required: true }} />
                            </div>
                            <div className="row">
                                <FieldArea ref={descriptionref} icon="chat-right-text" textarea={{ className: 'form-control', type: 'text', id: 'description', placeholder: 'Description', required: true }} />
                            </div>
                            <div className="row">
                                <Field ref={uidref} icon="link" input={{ className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', readOnly: true }} />
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
                                        <img className={classes.imgbackup} src={imgSrc} id="photo" onClick={imageViewHandler} />
                                    </CardJ>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardJ>
            </form>
            <Banner banner={'chat-right-text'} />
        </Fragment>
    )
}
export default RegisterNewMerchandise;