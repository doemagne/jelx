import classes from "./RegisterMerchandise.module.css";
import { useRef } from 'react';
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

        //const fileReader = new FileReader();//will read contents of file and encode to string.
    };


    return (
        <ModalJ>
            <main>
                <CardJ>
                    <div className={classes.imgcarry}>
                        <h1 className="h3 mb-3 fw-normal">Update Merchandise</h1>
                    </div>

                </CardJ>
                <br />
                <form onSubmit={submitHandler}>
                    <CardJ>
                        <section>
                            <div className="row">
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <input readOnly={false} ref={nameref} className="form-control" id="name" placeholder="Name" type="text" required defaultValue={currentItem.name} />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <input ref={priceref} className="form-control" id="price" placeholder="Price" step={0.01} type="number" required defaultValue={currentItem.price} />
                                        <label htmlFor="price">$ Price</label>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <textarea rows="3" ref={descriptionref} className="form-control" id="description" placeholder="Description" required defaultValue={currentItem.description} />
                                        <label htmlFor="description">Description</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <input readOnly ref={uidref} className="form-control" id="uid" placeholder="UID" type="text" required defaultValue={currentItem.uid} />
                                        <label htmlFor="UID">UID</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <br />
                                        <div className={`form-floating form-fl`}>
                                            <CardJ>
                                                <label style={{ "top": "50%" }} htmlFor="image">Upload Image</label>
                                                <input ref={imageref} className="form-control-file" id="image" placeholder="Image" type="file" required />
                                            </CardJ>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className={`form-floating form-fl`}>
                                            <div className={classes.imgcarry}>
                                                <br />
                                                <CardJ>
                                                    <label htmlFor="photo">Photo</label>
                                                    <br />
                                                    <img src={`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`} id="photo" />
                                                </CardJ>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </CardJ>
                    <br />
                    <div className="row">
                        <div className="col">
                            <CardJ>
                                <button className="w-100 btn btn-lg btn-danger" type="button" onClick={props.onClose}>Remove</button>
                            </CardJ>
                        </div>
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