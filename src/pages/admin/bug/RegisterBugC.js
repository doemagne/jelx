import { Fragment, Profiler, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import Field from "../../../components/js/UI/Field/Field"
import FieldArea from "../../../components/js/UI/Field/FieldArea"
import { delayRequest } from "../../../store/redux/action/Request"
import { fetchBugMap, registerSystemBug } from "../../../store/redux/action/BugAction"

const RegisterBugC = (props) => {
    const dispatch = useDispatch()
    const captionref = useRef()
    const inforef = useRef()
    const suggestionref = useRef()
    const currentpage = window.sessionStorage.getItem("window")
    const navigator = useNavigate()
    const cancelHandler = () => {
        // navigator(-1)
        props.setSelected(false)
    }

    // const fetchBugData = async () => {
    //     dispatch(fetchBugMap(props.token))
    // }

    // console.log(props)
    const submitHandler = (e) => {
        e.preventDefault()

        const data = {
            caption: captionref.current.value,
            information: inforef.current.value,
            suggestion: suggestionref.current.value,
            user: props.token,
            page: currentpage,

        }
        dispatch(registerSystemBug(data, props.token))
        props.setSelected(false)
        // console.log(data)
        // captionref.current.value = ""
        // inforef.current.value = ""
        // suggestionref.current.value = ""
    }
    useEffect(() => {
        // fetchBugData()
        delayRequest(500)
    }, [])

    return (
        <Fragment>
            {/* {!props.authenticated && <Navigate to="/" />} */}
            <main>
                <CardJ>
                    <div>
                        <h1>Report Bug</h1>
                    </div>
                </CardJ>
                <form onSubmit={submitHandler}>
                    <CardJ>
                        <div className="row">
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-warning" type="button" onClick={cancelHandler}>
                                    <span className="bi bi-chevron-double-left" />
                                </button>
                            </div>
                            {/* <div className="col">
                                <Link to={"/bug/mapping"}>
                                    <button title="Display All Bugs" className="w-100 btn btn-lg btn-primary" type="button">
                                        <span className="bi bi-view-list" />
                                    </button>
                                </Link>
                            </div> */}
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-danger" type="submit">
                                    <span className="bi bi-bug" />
                                </button>
                            </div>
                        </div>
                    </CardJ>
                    <CardJ>
                        <div className='row'>
                            <Field ref={captionref} icon="tag" input={{ title: "eg: I am getting signed out of my account when...", className: 'form-control', type: 'text', id: 'caption', placeholder: 'Caption', required: true }} />
                        </div>
                        <div className='row'>
                            <FieldArea ref={inforef} icon="info-circle" textarea={{ className: 'form-control', type: 'text', id: 'information', required: true, placeholder: 'Information: What were you doing before the occurance appeared & what happened?', }} />
                        </div>
                        <div className='row'>
                            <FieldArea ref={suggestionref} icon="lightbulb" textarea={{ className: 'form-control', type: 'text', id: 'suggestion', required: true, placeholder: 'Suggestions, expectations & feedback', }} />
                        </div>
                    </CardJ>
                    <Banner banner={"bug"} />
                </form>
            </main>
        </Fragment>
    )
}
export default RegisterBugC