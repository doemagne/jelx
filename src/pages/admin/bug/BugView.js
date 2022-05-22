import { Fragment, Profiler, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import Field from "../../../components/js/UI/Field/Field"
import FieldArea from "../../../components/js/UI/Field/FieldArea"
import { delayRequest } from "../../../store/redux/action/Request"
import { fetchBugMap, registerSystemBug, updateSystemBug } from "../../../store/redux/action/BugAction"
import FieldRead from "../../../components/js/UI/Field/FieldRead"
import Select from "../../../components/js/UI/Field/Select"

const statusnames = ['New', 'Pending', 'Acknowledged', 'Resolved']

const BugView = (props) => {
    const dispatch = useDispatch()
    const captionref = useRef()
    const inforef = useRef()
    const statusref = useRef()
    const pageref = useRef()
    const createdref = useRef()
    const suggestionref = useRef()
    const currentpage = window.sessionStorage.getItem("window")
    // const bug = useSelector(state => state.bug.current)
    const bug = useSelector(state => state.table.current)
    const navigator = useNavigate()
    const cancelHandler = () => {
        navigator(-1)
    }

    // console.log(props)

    const submitHandler = (e) => {
        e.preventDefault()

        const data = {
            id: bug.id,
            uid: bug.uid,
            caption: captionref.current.value,
            information: inforef.current.value,
            suggestion: suggestionref.current.value,
            page: currentpage,
            // created: createdref.current.value,
            status: statusref.current.value
        }
        dispatch(updateSystemBug(data, props.token))
        // navigator(-1)
        navigator("/bug/mapping")
        // console.log(data)
    }

    return (
        <Fragment>
            {!bug && <Navigate to="/bug/mapping" />}
            {bug &&
                <form onSubmit={submitHandler}>
                    <CardJ>
                        <div><h1>Bug Update</h1></div>
                    </CardJ>
                    <CardJ>
                        <div className="row">
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-warning" type="button" onClick={cancelHandler}>
                                    <span className="bi bi-chevron-double-left" />
                                </button>
                            </div>
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-danger" type="submit">
                                    <span className="bi bi-bug" />
                                </button>
                            </div>
                        </div>
                    </CardJ>
                    <CardJ>
                        <div className="row">
                            <div className="col">
                                <div className='row'>
                                    <FieldRead icon="123" input={{ title: "", className: 'form-control', type: 'number', id: 'id', placeholder: 'ID', required: false, readOnly: true, defaultValue: bug.id }} />
                                </div>
                                <div className='row'>
                                    <Field ref={captionref} icon="tag" input={{ title: ".", className: 'form-control', type: 'text', id: 'caption', placeholder: 'Caption', required: false, defaultValue: bug.caption, }} />
                                </div>
                                <div className='row'>
                                    <FieldArea ref={inforef} icon="info-circle" textarea={{ className: 'form-control', type: 'text', id: 'information', required: true, placeholder: 'Information: What were you doing before the occurance appeared & what happened?', defaultValue: bug.information }} />
                                </div>
                                <div className='row'>
                                    <FieldArea ref={suggestionref} icon="lightbulb" textarea={{ className: 'form-control', type: 'text', id: 'suggestion', required: true, placeholder: 'Suggestions, expectations & feedback', defaultValue: bug.suggestion }} />
                                </div>
                            </div>
                            <div className="col">
                                <div className='row'>
                                    <FieldRead icon="link" input={{ title: ".", className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', required: false, readOnly: true, defaultValue: bug.uid, }} />
                                </div>
                                <div className='row'>
                                    <FieldRead icon="person-circle" input={{ title: "Created by", className: 'form-control', type: 'text', id: 'owner', placeholder: 'Owner', required: false, readOnly: true, defaultValue: bug.user }} />
                                </div>
                                <div className="row">
                                    <Field ref={createdref} icon="calendar-event" input={{ title: "Date created", className: 'form-control', type: 'datetime-local', id: 'created', placeholder: 'Created', required: false, defaultValue: bug.created }} />
                                </div>
                                <div className='row'>
                                    <Select ref={statusref} icon={`wrench-adjustable-circle`} options={statusnames} select={{ className: 'form-control', id: 'status', defaultValue: bug.status, readOnly: false, }} onSelectChange={() => { }} />
                                </div>
                                <div className='row'>
                                    <Field ref={pageref} icon="file-earmark-post" input={{ title: "..", className: 'form-control', type: 'text', id: 'page', placeholder: 'Page', required: true, defaultValue: bug.page }} />
                                </div>
                            </div>
                        </div>
                    </CardJ>
                </form>
            }

            <Banner banner="bug" />
            {/* </main> */}
        </Fragment>
    )
}
export default BugView