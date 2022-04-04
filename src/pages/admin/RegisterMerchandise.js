import classes from "./RegisterMerchandise.module.css";
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import CardJ from '../../components/js/UI/CardJ';
import ModalJ from '../../components/js/UI/ModalJ';
import { ServerURL } from '../../constraint/ServerURL';
const RegisterMerchandise = (props) => {
    const currentItem = useSelector(state => state.merchandise.currentItem);
    const nameref = useRef();
    const uidref = useRef();
    const priceref = useRef();
    const descriptionref = useRef();
    const imageref = useRef();

    const submitHandler = async (e) => {
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
        console.log(props);
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

    return (
        <ModalJ>
            <main>
                <CardJ>
                    <div className={classes.imgcarry}>
                        <h1 className="h3 mb-3 fw-normal">{props.newItem ? "Add New Merchandise" : "Update Merchandise"}</h1>
                    </div>
                </CardJ>
                <form onSubmit={submitHandler}>
                    <CardJ>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <input readOnly={false} ref={nameref} className="form-control" id="name" placeholder="Name" type="text" required defaultValue={currentItem.name} />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <input ref={priceref} className="form-control" id="price" placeholder="Price" step={0.01} type="number" required defaultValue={currentItem.price} />
                                        <label htmlFor="price">$ Price</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <textarea rows="3" ref={descriptionref} className="form-control" id="description" placeholder="Description" required defaultValue={currentItem.description} />
                                        <label htmlFor="description">Description</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <input readOnly ref={uidref} className="form-control" id="uid" placeholder="UID" type="text" required defaultValue={currentItem.uid} />
                                        <label htmlFor="UID">UID</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <br />
                                    <div className={`form-floating form-fl`}>
                                        <CardJ>
                                            <div className={classes.imgcarry}>
                                                <input ref={imageref} className="form-control-file" id="image" placeholder="Image" type="file" required />
                                            </div>
                                        </CardJ>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={`form-floating form-fl`}>
                                        <div className={classes.imgcarry}>
                                            {
                                                !props.newItem &&
                                                <CardJ>
                                                    <img src={`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`} id="photo" />
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
                                <CardJ>
                                    <button className="w-100 btn btn-lg btn-danger" type="button" onClick={removeHandler}>Remove</button>
                                </CardJ>
                            </div>
                        }
                        <div className="col">
                            <CardJ>
                                <button className="w-100 btn btn-lg btn-warning" type="button" onClick={props.onClose}>Cancel</button>
                            </CardJ>
                        </div>
                        <div className="col">
                            <CardJ>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                            </CardJ>
                        </div>
                    </div>
                </form>
            </main >
        </ModalJ >
    );

};

//<p className="mt-5 mb-3 text-muted">&copy; 2022</p>

export default RegisterMerchandise;