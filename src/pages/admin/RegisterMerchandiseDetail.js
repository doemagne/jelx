import Field from '../../components/js/UI/Field/Field';
import FieldArea from '../../components/js/UI/Field/FieldArea';
import classes from "./RegisterMerchandise.module.css";
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardJ from '../../components/js/UI/CardJ';
import ModalJ from '../../components/js/UI/ModalJ';
import { ServerURL } from '../../constraint/ServerURL';
import { setloading } from "../../store/redux/slice/UISlice";
import { Route } from 'react-router-dom';
const RegisterMerchandise = (props) => {
    const [imgSrc, setImgSrc] = useState('');
    const [newImg, setNewImg] = useState(props.newItem);
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.merchandise.currentItem);
    const nameref = useRef();
    const uidref = useRef();
    const activeref = useRef();
    const quantityref = useRef();
    const priceref = useRef();
    const descriptionref = useRef();
    const imageref = useRef();

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
        dispatch(setloading(true));
        e.preventDefault();
        const itemdata = {
            name: nameref.current.value,
            price: priceref.current.value,
            quantity: quantityref.current.value,
            description: descriptionref.current.value,
            uid: uidref.current.value,
            active: activeref.current.value,
        };
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 5000);
        const formdata = new FormData();
        formdata.append("merchandise", JSON.stringify(itemdata));
        formdata.append("photo", imageref.current.files[0]);
        //dispatch(uploadMerchandiseData(formdata));
        try {
            if (props.newItem) {
                const stimulus = await fetch(ServerURL + '/api/merchandise/upload', {
                    method: 'POST',
                    body: formdata,
                    signal: ctrl.signal,
                });
                console.log(stimulus.status);
            } else {
                const stimulus = await fetch(ServerURL + '/api/merchandise/update', {
                    method: 'PUT',
                    body: formdata,
                    signal: ctrl.signal,
                });
                console.log(stimulus.status);
            }
        } catch (error) {
            console.log("An error occured when uploading the form data.", error);
        }
        //console.log(props);
        props.setNewItem(false);
        props.onClose();
        dispatch(setloading(false));
    };
    const removeHandler = () => {
        let confirmation = "This item will be removed from the merchandise list. Are you sure you want to proceed?";
        let removal = window.confirm(confirmation, "Are you sure");
        if (removal) {
            props.onClose()
            alert("The item has been removed successfully");
        }
        props.setNewItem(false);

    };
    const ImageSrcHandler = () => {
        if (props.newItem) {
            setImgSrc(URL.createObjectURL(imageref.current.files[0]));
        } else {
            setImgSrc(`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`);
        }
        if (imageref.current.files.length > 0) {
            setNewImg(true)
            setImgSrc(URL.createObjectURL(imageref.current.files[0]));
        } else {
            setNewImg(false);
        }
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
        <Fragment>
        <CardJ>
            <div className={classes.imgcarry}>
                <h1 className="h3 mb-3 fw-normal">{props.newItem ? "Add New Merchandise" : "Update Merchandise"}</h1>
            </div>
        </CardJ>
        <form onSubmit={submitHandler}>
            <CardJ>
                <div className="row">
                    <div className="col-sm">
                        <div className="row">
                            <Field ref={nameref} icon="tag" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Item Name', defaultValue: currentItem.name, required:true }} />
                        </div>
                        <div className="row">
                            <Field ref={quantityref} icon="boxes" input={{ className: 'form-control', type: 'number', step:"1", id: 'quantity', placeholder: 'Quantity', defaultValue: currentItem.quantity, required:true }} />
                        </div>
                        <div className="row">
                            <Field ref={priceref} icon="currency-dollar" input={{ className: 'form-control', type: 'number',step:"0.01", id: 'price', placeholder: 'Price', defaultValue: currentItem.price, required:true }} />
                        </div>
                        <div className="row">
                            <FieldArea ref={descriptionref} icon="chat-right-text" textarea={{ className: 'form-control', type: 'text', id: 'description', placeholder: 'Description', defaultValue: currentItem.description, required:true }} />
                        </div>
                        <div className="row">
                            <Field ref={uidref} icon="link" input={{ className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', defaultValue: currentItem.uid, readOnly:true }} />
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
                                        <input ref={activeref} className="form-check-input" id="active" type="checkbox" defaultChecked={currentItem.active}/>
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
                                <div className={classes.imgcarry}>
                                    {
                                    !props.newItem &&
                                    <CardJ>
                                        {
                                            newImg &&
                                            <img src={imgSrc} id="photo" onClick={imageViewHandler} />
                                        }
                                        <img className={classes.imgbackup} src={`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`} id="photo" onClick={imageViewHandler} />
                                    </CardJ>
                                    }
                                    {
                                    props.newItem &&
                                    <CardJ>
                                        <img className={classes.imgbackup} src={imgSrc} id="photo" onClick={imageViewHandler} />
                                    </CardJ>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardJ>
            <div className="row">
                {
                    !props.newItem &&
                    <div className="col">
                            <button className="w-100 btn btn-lg btn-danger" type="button" onClick={deactivateMerchandiseHandler}>
                                <span className="bi bi-trash3-fill"></span>
                                Remove
                            </button>
                    </div>
                }
                <div className="col">
                        <button className="w-100 btn btn-lg btn-warning" type="button" onClick={props.onClose}>
                            <span className="bi bi-x-lg" />
                            Cancel
                        </button>
                </div>
                <div className="col">
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            <span className="bi bi-cloud-upload-fill" />
                            Save
                        </button>
                </div>
            </div>
        </form>
    <CardJ>
        <div>
            <span className="bi bi-cloud-plus" style={{ fontSize: "5rem" }} />
            <br />
        </div>
    </CardJ>
        </Fragment>
    );

};

export default RegisterMerchandise;