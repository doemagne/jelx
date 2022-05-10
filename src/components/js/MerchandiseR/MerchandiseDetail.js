import classes from '../../../pages/admin/RegisterMerchandise.module.css';
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate, Navigate, useParams } from "react-router-dom";
import { ServerURL } from "../../../constraint/ServerURL";
import Banner from "../UI/Banner/Banner";
import CardJ from "../UI/CardJ";
import Comments from '../UI/Comment/Comments';
import Field from "../UI/Field/Field";
import FieldArea from "../UI/Field/FieldArea";
import { sendCartItem } from '../../../store/redux/action/CartAction';
import { delayRequest } from '../../../store/redux/action/Request';
import HeaderR from '../Layout/Header/HeaderR';
const MerchandiseDetail = (props) => {
    const [imgSrc, setImgSrc] = useState();
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const currentItem = useSelector(state => state.merchandise.currentItem)
    const cartuid = useSelector(state => state.cart.uid)
    const quantityref = useRef()
    window.sessionStorage.setItem("window", window.location.pathname)
    const token = window.sessionStorage.getItem("token")
    const cancelHandler = () => {
        navigator("/merchandise/cartr")
    }
    const imageViewHandler = () => {
        window.open(`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`, '_blank').focus();
    };
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(quantityref.current.value)
        const titem = {
            cartuid: props.cartuid,
            id: currentItem.id,
            name: currentItem.name,
            quantity: +quantityref.current.value,
            price: currentItem.price,
            uid: currentItem.uid,
            iref: currentItem.iref,
        }
        dispatch(sendCartItem(titem, token));

    };
    const showCartHandler = () => {
        navigator("/merchandise/cart")
    }

    return (
        <section>
            {!props.authenticated && (<Navigate to="/" />)}
            {!currentItem && (<Navigate to="/merchandise/cartr" />)}
            <Fragment>
                <HeaderR onShowCart={showCartHandler} />
                <main>
                    (<CardJ>
                        <div className={classes.imgcarry}>
                            <h1>Merchandise Detail</h1>
                        </div>
                    </CardJ>
                    {currentItem && (
                        <form onSubmit={submitHandler}>
                            <CardJ>
                                <div className="row">
                                    <div className="col">
                                        <button className="w-100 btn btn-lg btn-warning" type="button" onClick={cancelHandler}>
                                            <span className="bi bi-chevron-double-left" />
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                                            <span className="bi bi-cart" />
                                        </button>
                                    </div>
                                </div>
                            </CardJ>
                            <CardJ>
                                <div className="row">
                                    <div className="col-sm">
                                        <div className="row">
                                            <div className={`form-floating form-fl`}>
                                                <CardJ>
                                                    <img className={classes.imgbackup} src={`${ServerURL}/assets/media/merchandise/${currentItem.uid}/i.png`} id="photop" onClick={imageViewHandler} />
                                                </CardJ>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <div className='row'>
                                            <Field ref={quantityref} icon="box" input={{ className: 'form-control', type: 'number', step: "1", id: 'cartquantity', placeholder: 'Quantity', defaultValue: "1", required: true, }} />
                                        </div>
                                        <div className="row">
                                            <Field icon="tag" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Item Name', readOnly: true, defaultValue: currentItem.name }} />
                                        </div>
                                        <div className="row">
                                            <Field icon="boxes" input={{ className: 'form-control', type: 'number', step: "1", id: 'quantity', placeholder: 'Quantity', readOnly: true, defaultValue: currentItem.quantity }} />
                                        </div>
                                        <div className="row">
                                            <Field icon="currency-dollar" input={{ className: 'form-control', type: 'number', step: "0.01", id: 'price', placeholder: 'Price', readOnly: true, defaultValue: currentItem.price }} />
                                        </div>
                                        <div className="row">
                                            <FieldArea icon="chat-right-text" textarea={{ className: 'form-control', type: 'text', id: 'description', placeholder: 'Description', readOnly: true, defaultValue: currentItem.description }} />
                                        </div>
                                        <div className="row">
                                            <Field icon="link" input={{ className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', readOnly: true, defaultValue: currentItem.uid }} />
                                        </div>
                                    </div>

                                </div>
                            </CardJ>
                        </form>
                    )}
                    <Banner banner={'chat-right-text'} />
                    <CardJ>
                        <Link to={`comments`} className='nav-link active' aria-current="page" >
                            <span className="bi bi-chat-left-text" />
                        </Link>
                    </CardJ></main>
            </Fragment>
        </section>
    )
}
//<Routes>
//<Route path={`comments`} element={<Comments />} />
//</Routes>
//<Route path={`/merchandise/detail/${params.idkey}/comments`} element={<Comments/>} />
//<Link to={`/merchandise/detail/${params.idkey}/comments`} className='nav-link active' aria-current="page" >

//<Comments></Comments>
//<Route path={`/merchandise/cartr/${params.key}/comments`} element={<Comments/>} />
export default MerchandiseDetail;