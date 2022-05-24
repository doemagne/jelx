import "../table/Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
// import { fetchBugMap } from "../../../store/redux/action/BugAction"
import Table from "../table/Table"
import { filterItems, loadTableData, setTableSelection } from "../../../store/redux/slice/TableSlice"
import { setCurrent } from "../../../store/redux/slice/BugSlice"
import Caption from "../table/view/Caption"
import { fetchMap } from "../../../store/redux/action/MappingAction"
// import BugViewC from "./BugViewC"
// import RegisterBugC from "./RegisterBugC"
// import { delayRequest } from "../../../store/redux/action/Request"
// import BugRow from "./BugRow"
// import BugView from "./BugView"
// import RegisterBug from "./RegisterBug"

const restrictions = ["phone","birthdate", "information", "language", "attachment"]

// let firstsort = true
const UserLog = (props) => {
    const data = useSelector(state => state.mapping.mapping.items)
    const query = useSelector(state => state.table.query)
    const [selected, setSelected] = useState(false)
    const [registered, setRegistered] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    window.sessionStorage.setItem("window", window.location.pathname)

    const cancelHandler = () => {
        navigator(-1)
    }
    const fetchData = async (table) => {
        dispatch(fetchMap(table, props.token,restrictions))
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
        if (data.length > 0) {
            // console.log(data)
            dispatch(loadTableData({ content: data, restrictions: restrictions }))
            dispatch(filterItems(query))
        } else {
            // console.log("fetching bugs")
            fetchData('user/profile')
        }
    }, [data])

    return (
        <Fragment>
            {!props.authenticated && <Navigate to="/" />}
            {/* {registered && <RegisterBugC setSelected={setRegistered} token={props.token} />} */}
            {/* {selected && <BugViewC setSelected={setSelected} token={props.token} />} */}
            {!selected && !registered &&
                <Fragment>
                    <Caption caption={"User Log"} />
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

                    <Table data={data} defaultClickHandler={onRowClickHandler}></Table>
                    <Banner banner={"view-list"} />
                </Fragment>}
        </Fragment>
    )
}

export default UserLog