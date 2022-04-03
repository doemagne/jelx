import { Fragment, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemU from '../../components/js/MerchandiseR/Item/ItemU';
import CardJ from '../../components/js/UI/CardJ';
import { ServerURL } from '../../constraint/ServerURL';
import { uploadMerchandiseData } from '../../store/redux/action/MerchandiseAction';
import { fetchMerchandiseData } from '../../store/redux/action/MerchandiseAction';
//import { CardJ } from '../components/js/UI/CardJ';
const RegisterMerchandise = () => {
    const dispatch = useDispatch();
    const merchandisel = useSelector(state => state.merchandise.merchandise);
    const nameref = useRef();
    const priceref = useRef();
    const descriptionref = useRef();
    const imageref = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        const itemdata = {
            name: nameref.current.value,
            price: priceref.current.value,
            description: descriptionref.current.value,
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



        //const fileReader = new FileReader();//will read contents of file and encode to string.
    };
    const fetchMerchandise = async () => {
        dispatch(fetchMerchandiseData());
    };

    useEffect(() => {
        if (merchandisel.length == 0) {
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
            uid={merchandise.uid}
            iref={merchandise.iref}
        />
    ));

    return (
        <Fragment>
            <CardJ>
                <main>
                    <h1 className="h3 mb-3 fw-normal">Register New Merchandise</h1>
                    <br />
                    <form onSubmit={submitHandler}>
                        <section>
                            <div className="row">
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <input readOnly={false} ref={nameref} className="form-control" id="name" placeholder="Name" type="text" required />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <input ref={priceref} className="form-control" id="price" placeholder="Price" step={0.01} type="number" required />
                                        <label htmlFor="price">$ Price</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div >
                                        <label htmlFor="image">Upload Image</label>
                                        <input ref={imageref} className="form-control-file" id="image" placeholder="Image" type="file" required />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <br />
                        <section>
                            <div className="row">
                                <div className="col">
                                    <div className={`form-floating form-fl`}>
                                        <textarea ref={descriptionref} className="form-control" id="description" placeholder="Description" required />
                                        <label htmlFor="description">Description</label>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <br />
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                    </form>
                </main >
            </CardJ>
            <CardJ>
                {merchandiseList}
            </CardJ>
        </Fragment>
    );

};

export default RegisterMerchandise;