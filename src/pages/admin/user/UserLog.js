import "../table/Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
// import { fetchBugMap } from "../../../store/redux/action/BugAction"
import Table from "../table/Table"
import { setTableSelection } from "../../../store/redux/slice/TableSlice"
import { setCurrent } from "../../../store/redux/slice/BugSlice"
import Caption from "../table/view/Caption"
import { fetchMap } from "../../../store/redux/action/MappingAction"
import { filterItems, loadTableData } from "../../../store/redux/slice/MappingSlice"
import Mapping from "../mapping/Mapping"
import { delayRequest } from "../../../store/redux/action/Request"

const restrictions = []

const UserLog = (props) => {
    const data = props.mapping
    const dispatch = useDispatch()

    const cancelHandler = () => {
        props.setMapping(null)
    }

    const registerHandler = () => {
        // setRegistered(true)
    }
    
    const onRowClickHandler = (item) => {
        dispatch(setCurrent(item.id))
        dispatch(setTableSelection(item.id))
        // setSelected(true)
    }
    // const str = "hi"
    // str.replace()

    return (
        <Fragment>
            {/* {!props.authenticated && <Navigate to="/" />} */}
            <Fragment>
                <Caption caption={`${data.name} Logs`} />
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

                <Mapping mapIdx={data.id} data={data} defaultClickHandler={onRowClickHandler}></Mapping>
                <Banner banner={"view-list"} />
            </Fragment>
        </Fragment>
    )
}

export default UserLog

// let firstsort = true
// import BugViewC from "./BugViewC"
// import RegisterBugC from "./RegisterBugC"
// import { delayRequest } from "../../../store/redux/action/Request"
// import BugRow from "./BugRow"
// import BugView from "./BugView"
// import RegisterBug from "./RegisterBug"
// const data = useSelector(state => state.mapping.mappings[1].items)
// const data = useSelector(state => state.mapping.mappings[props.mapIdx])
// const [mapRef, setMapRef] = useState()
// const query = useSelector(state => state.table.query)
// const query = data.query
// const [selected, setSelected] = useState(false)
// const [registered, setRegistered] = useState(false)
// const [mapdata, setData] = useState()
// const navigator = useNavigate()

{/* {registered && <RegisterBugC setSelected={setRegistered} token={props.token} />} */ }
{/* {selected && <BugViewC setSelected={setSelected} token={props.token} />} */ }
{/* {!selected && !registered && */ }
{/* } */ }

    // useEffect(() => {
    //     delayRequest(5000)

    //     if (!data.items || data.items.length === 0) {
    //         // console.log("fetching bugs")
    //         fetchData('userprofile')
    //     }
    //     if (data.name != "userprofile") {
    //         console.log(data.name)
    //         // }
    //         // if (data && data.length > 0) {
    //         // console.log(data)
    //         dispatch(loadTableData({ table: "userprofile" }))
    //         dispatch(filterItems(query))
    //     }
    // }, [data.items, data.name])
