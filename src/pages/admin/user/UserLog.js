import "../table/Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import { prepareItemRegistration, setTableSelection } from "../../../store/redux/slice/MappingSlice"
import Caption from "../table/view/Caption"
import Mapping from "../mapping/Mapping"
import MapView from "../mapping/MapView"

const restrictions = []

const UserLog = (props) => {
    const data = props.mapping
    const dispatch = useDispatch()
    const [rowSelected, setRowSelected] = useState()
    const current = useSelector(state => state.mapping.mappings[data.id].current)
    // const current = data.current
    const cancelHandler = () => {
        props.setMapping(null)
    }

    const registerHandler = () => {
        // setRegistered(true)
        dispatch(prepareItemRegistration({ map: data.id }))
        setRowSelected({ item: current, map: data.id })
        console.log(current)
    }

    const onRowClickHandler = (item) => {
        dispatch(setTableSelection({ item: item, map: data.id }))
        setRowSelected({ item: item, map: data.id })
    }

    return (<Fragment>
        {/* {!props.authenticated && <Navigate to="/" />} */}
        {rowSelected && <MapView mapname={data.name === "Userprofile" ? "profile" : data.name} rowSelected={rowSelected} setRowSelected={setRowSelected} mapId={data.id} caption={`${data.name}`} />}
        {!rowSelected && <Fragment>
            <CardJ>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-default btn-warning" type="button" onClick={cancelHandler}>
                            <span className="bi bi-chevron-double-left" />
                        </button>
                    </div>
                    <div className="col">
                        <Caption caption={`${data.name} Logs`} />
                    </div>
                    <div className="col">
                        <button className="btn btn-default btn-success" type="button" onClick={registerHandler}>
                            <span className="bi bi-plus-circle" />
                        </button>
                    </div>
                </div>
            </CardJ>
            <Mapping mapIdx={data.id} data={data} defaultClickHandler={onRowClickHandler}></Mapping>
            <Banner banner={"view-list"} />
        </Fragment>}
    </Fragment>)
}

export default UserLog
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
// import { fetchMap } from "../../../store/redux/action/MappingAction"
// import { filterItems, loadTableData } from "../../../store/redux/slice/MappingSlice"
// // import { fetchBugMap } from "../../../store/redux/action/BugAction"
// import Table from "../table/Table"
// import { setCurrent } from "../../../store/redux/slice/BugSlice"
// import { delayRequest } from "../../../store/redux/action/Request"

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
