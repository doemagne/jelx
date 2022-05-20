import "./Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import { fetchBugMap } from "../../../store/redux/action/BugAction"
import { delayRequest } from "../../../store/redux/action/Request"
import BugRow from "./BugRow"
import Table from "./Table"
import { loadTableData } from "../../../store/redux/slice/TableSlice"

const desc = `sort-down`
const asc = `sort-up`
const restrictions = ["created", "user", "uid", "page", "suggestion"]

// let firstsort = true
const BugLog = (props) => {
    const bugs = useSelector(state => state.bug.bugs)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const cancelHandler = () => {
        navigator(-1)
    }
    const fetchBugData = async () => {
        dispatch(fetchBugMap(props.token))
    }

    useEffect(() => {
        if (bugs) {
            console.log("got bugs")
            // console.log(bugs)
            dispatch(loadTableData({ content: bugs, restrictions: restrictions }))
        } else {
            console.log("fetching bugs")
            fetchBugData(props.token)
        }
    }, [bugs])

    return (
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
                </div>
            </CardJ>
            <Table data={bugs}></Table>
            <Banner banner={"view-list"} />
        </Fragment>
    )
}

export default BugLog