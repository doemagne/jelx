import "../table/Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import { fetchBugMap } from "../../../store/redux/action/BugAction"
import { delayRequest } from "../../../store/redux/action/Request"
import BugRow from "./BugRow"

const desc = `sort-down`
const asc = `sort-up`
// let firstsort = true
const BugListView = (props) => {
    const [bugsl, setBugsl] = useState()
    const [idSort, setIdSort] = useState(desc)
    const [captionSort, setCaptionSort] = useState(asc)
    const bugs = useSelector(state => state.bug.bugs)
    const dispatch = useDispatch()
    const fetchBugData = async () => {
        dispatch(fetchBugMap(props.token))
    }
    const navigator = useNavigate()
    const cancelHandler = () => {
        navigator(-1)
    }
    // const windowonscroll = () => {
    //     if (window.screenTop() == document.innerHeight - window.innerHeight) {
    //         console.log("loading more data.")
    //     }
    // }
    // window.scroll(windowonscroll)
    

    useEffect(() => {
        if (!bugs) {
            fetchBugData()
        }
        if (!bugsl) {
            idSortHandler()
            // firstsort = false
        }
        // windowonscroll()
    }, [idSort, captionSort])

    const captionSortHandler = () => {
        if (bugs) {
            if (captionSort == desc) {
                setBugsl([]
                    .concat(bugs)
                    .sort((a, b) => a.caption < b.caption ? 1 : -1)
                    .map((bug) => <BugRow
                        key={bug.id}
                        id={bug.id}
                        caption={bug.caption}
                        information={bug.information}
                        suggestion={bug.suggestion}
                        page={bug.page}
                        uid={bug.uid}
                        created={bug.created}
                    />
                    ))
            } else {
                setBugsl([]
                    .concat(bugs)
                    .sort((a, b) => a.caption > b.caption ? 1 : -1)
                    .map((bug) => <BugRow
                        key={bug.id}
                        id={bug.id}
                        caption={bug.caption}
                        information={bug.information}
                        suggestion={bug.suggestion}
                        page={bug.page}
                        status={bug.status}
                        user={bug.user}
                        uid={bug.uid}
                        created={bug.created}
                    />
                    ))
            }
            if (captionSort == asc) {
                setCaptionSort(desc)
            } else if (captionSort == desc) {
                setCaptionSort(asc)
            }

            console.log(captionSort)
        }
    }

    const idSortHandler = () => {
        if (bugs) {
            if (idSort == desc) {
                setBugsl([]
                    .concat(bugs)
                    .sort((a, b) => a.id < b.id ? 1 : -1)
                    .map((bug) => <BugRow
                        key={bug.id}
                        id={bug.id}
                        caption={bug.caption}
                        information={bug.information}
                        suggestion={bug.suggestion}
                        page={bug.page}
                        uid={bug.uid}
                        status={bug.status}
                        user={bug.user}
                        created={bug.created}
                    />
                    ))
            } else {
                setBugsl([]
                    .concat(bugs)
                    .sort((a, b) => a.id > b.id ? 1 : -1)
                    .map((bug) => <BugRow
                        key={bug.id}
                        id={bug.id}
                        caption={bug.caption}
                        information={bug.information}
                        suggestion={bug.suggestion}
                        page={bug.page}
                        uid={bug.uid}
                        status={bug.status}
                        user={bug.user}
                        created={bug.created}
                    />
                    ))
            }
            if (idSort === asc) {
                setIdSort(desc)
            } else if (idSort === desc) {
                setIdSort(asc)
            }

        }
    }

    return (
        <Fragment>
            {!props.authenticated && <Navigate to={"/"} />}
            <CardJ>
                <div>
                    <h1>Bug Logs</h1>
                </div>
            </CardJ>
            <CardJ>
                <div className="row">
                    <div className="col">
                        <button className="w-100 btn btn-lg btn-warning" type="button" onClick={cancelHandler}>
                            <span className="bi bi-chevron-double-left" />
                        </button>
                    </div>
                </div>
            </CardJ>
            <CardJ>
                <table className="table table-light table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" >
                                <span className={`bi bi-${idSort}`} onClick={idSortHandler} />
                            </th>
                            <th scope="col">
                                <span className={`bi bi-${captionSort}`} onClick={captionSortHandler}>
                                    Caption
                                </span>
                            </th>
                            <th scope="col">Information</th>
                            <th scope="col">Suggestion</th>
                            <th scope="col">Page</th>
                            <th scope="col">Status</th>
                            <th scope="col">User</th>
                            {/* <th scope="col">Created</th> */}
                        </tr>
                    </thead>
                    <tbody>{bugsl}</tbody>
                </table>
            </CardJ>
            <Banner banner={"view-list"} />
        </Fragment>
    )
}

export default BugListView