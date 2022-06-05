import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import Field from "../../../components/js/UI/Field/Field"
import FieldHeader from "../../../components/js/UI/Field/FieldHeader"
import FieldIcon from "../../../components/js/UI/Field/FieldIcon"
import FieldUpload from "../../../components/js/UI/Field/FieldUpload"
import { ServerURL } from "../../../constraint/ServerURL"
import { registerMap, updateMap } from "../../../store/redux/action/MappingAction"
import { updateCurrentHeader, updateTableRow } from "../../../store/redux/slice/MappingSlice"
import Caption from "../table/view/Caption"
import defimg from '../../../assets/image.svg'

const MapView = (props) => {
    const headers = useSelector(state => state.mapping.mappings[props.mapId].headers)
    const current = useSelector(state => state.mapping.mappings[props.mapId].current)
    const [fields, setFields] = useState()
    const fieldref = useRef()
    const imageref = useRef()
    const [imgSrc, setImgSrc] = useState(defimg);
    const token = window.sessionStorage.getItem("token")
    const dispatch = useDispatch()
    const cancelHandler = () => {
        props.setRowSelected(null)
    }
    let c = "header"
    // c.toLowerCase
    const apicaption = props.caption.toLowerCase().endsWith(c) ? c : props.caption.toLowerCase()

    const onChangeHandler = (header, value) => {
        dispatch(updateCurrentHeader({ ...header, value: value.target.value }))
    }
    const updateHandler = () => {
        // item.preventDefault()
        dispatch(updateTableRow({ map: props.mapId }))
        // console.log(current)
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 5000);
        const formdata = new FormData();
        const entries = formdata.entries()
        formdata.append("data", JSON.stringify(current));
        formdata.append("attachment", imageref.current.files.length > 0)
        formdata.append("photo", imageref.current.files[0]);
        console.log(formdata.getAll("photo"))
        dispatch(updateMap(apicaption, formdata, token))
    }
    const actionHandler = () => {
        if (current.uid && current.uid.length > 0) {
            console.log(current.uid)
            updateHandler()
        } else {
            console.log("no uid")
            registerHandler()
        }
    }
    const registerHandler = () => {
        // item.preventDefault()
        dispatch(updateTableRow({ map: props.mapId }))
        console.log(current)
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 5000);
        const formdata = new FormData();
        const entries = formdata.entries()
        formdata.append("data", JSON.stringify(current));
        formdata.append("attachment", imageref.current.files.length > 0)
        formdata.append("photo", imageref.current.files[0]);
        console.log(formdata.getAll("photo"))
        dispatch(registerMap(apicaption, formdata, token))
    }
    const ImageSrcHandler = () => {
        setImgSrc(`${ServerURL}/assets/media/${props.mapname.toLowerCase()}/${current.uid}/i.png`);
        if (imageref.current.files.length > 0) {
            setImgSrc(URL.createObjectURL(imageref.current.files[0]));
        }
    };
    const imageViewHandler = () => {
        window.open(imgSrc, '_blank').focus();
    };



    useEffect(() => {
        if (current.uid && current.uid.length > 0) {
            ImageSrcHandler()
        }
        setFields(headers.map((header) => (
            <FieldHeader ref={fieldref}
                key={header.id}
                header={header}
                current={current[`${header.headerCaption}`]}
                onChangeHandler={onChangeHandler.bind(null, header)}
            />
        )))
    }, [])

    return (<Fragment>
        <form encType="application/json">
            {/* <form encType="multipart/form-data"> */}
            <CardJ>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-default btn-warning" type="button" onClick={cancelHandler}>
                            <span className="bi bi-chevron-double-left" />
                        </button>
                    </div>
                    <div className="col" >
                        <Caption caption={props.caption} />
                    </div>
                    <div className="col">
                        <button className="btn btn-default btn-danger" type="button" onClick={actionHandler}>
                            <span className="bi bi-bug" />
                        </button>
                    </div>
                </div>
            </CardJ>
            <CardJ>
                {current.id}
                <div className="row">
                    <div className="col">
                        {fields}
                    </div>
                    <div className="col">
                        <FieldUpload ref={imageref} onChangeHandler={ImageSrcHandler} />
                        <img className={`image-fluid`} src={imgSrc} id="photo" onClick={imageViewHandler} />
                    </div>
                </div>
            </CardJ>
            <Banner banner={"view-list"} />
        </form>
    </Fragment>)
}

export default MapView