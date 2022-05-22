import "../table/Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import { fetchBugMap } from "../../../store/redux/action/BugAction"
import { delayRequest } from "../../../store/redux/action/Request"
import BugRow from "./BugRow"
import Table from "../table/Table"
import { filterItems, loadTableData, setTableSelection } from "../../../store/redux/slice/TableSlice"
import BugView from "./BugView"
import { setCurrent } from "../../../store/redux/slice/BugSlice"
import BugViewC from "./BugViewC"
import RegisterBug from "./RegisterBug"
import RegisterBugC from "./RegisterBugC"

const restrictions = ["created", "user", "uid", "page", "suggestion"]

// let firstsort = true
const BugLog = (props) => {
    const bugs = useSelector(state => state.bug.bugs)
    const query = useSelector(state => state.table.query)
    const [selected, setSelected] = useState(false)
    const [registered, setRegistered] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const cancelHandler = () => {
        navigator(-1)
    }
    const fetchBugData = async () => {
        dispatch(fetchBugMap(props.token))
    }

    const registerHandler = () => {
        setRegistered(true)
    }

    const onRowClickHandler = (item) => {
        // console.log(item.id)
        dispatch(setCurrent(item.id))
        dispatch(setTableSelection(item.id))
        // navigator("/bug/update")
        setSelected(true)
    }

    useEffect(() => {
        if (bugs) {
            // console.log("got bugs")
            dispatch(loadTableData({ content: bugs, restrictions: restrictions }))
            dispatch(filterItems(query))
        } else {
            // console.log("fetching bugs")
            fetchBugData(props.token)
        }
    }, [bugs])

    return (
        <Fragment>
            {!props.authenticated && <Navigate to="/" />}
            {registered && <RegisterBugC setSelected={setRegistered} token={props.token} />}
            {selected && <BugViewC setSelected={setSelected} token={props.token} />}
            {!selected && !registered &&
                <Fragment>
                    <CardJ>
                        <div>
                            <h1>Bug Log</h1>
                        </div>
                    </CardJ>
                    <CardJ>
                        <div className="row">
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-warning" type="button" onClick={cancelHandler}>
                                    <span className="bi bi-chevron-double-left" />
                                </button>
                            </div>
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-danger" type="button" onClick={registerHandler}>
                                    <span className="bi bi-bug" />
                                </button>
                            </div>

                        </div>
                    </CardJ>

                    <Table data={bugs} defaultClickHandler={onRowClickHandler}></Table>
                    <Banner banner={"view-list"} />
                </Fragment>}
        </Fragment>
    )
}

export default BugLog