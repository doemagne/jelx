import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMap } from "../../../store/redux/action/MappingAction"
import { delayRequest } from "../../../store/redux/action/Request"
import { transportTableX } from "../../../store/redux/slice/MappingSlice"
import UserLog from "../user/UserLog"
import ButtonMap from "./ButtonMap"

const maps = ["userprofile", "bug", "merchandise"]
const restrictions = []

const SystemConfig = (props) => {
    window.sessionStorage.setItem("window", window.location.pathname)
    // const dispatch = useDispatch()
    const dispatch = useDispatch()
    const mappings = useSelector(state => state.mapping.mappings)
    const [mapOptions, setMapOptions] = useState()
    const [mapping, setMapping] = useState()

    const fetchData = async (table) => {
        dispatch(fetchMap(table, props.token, restrictions))
    }
    const fetchHandler = async (maps) => {
        maps.forEach((map) => {
            fetchData(map)
        })
    }
    const fetchHeaderData = () => {
        mappings.forEach((m) => {
            console.log(m)
            dispatch(transportTableX({ table: `${m.name} Header`, content: m.headers, restrictions: restrictions }))
        })
    }
    const onClickHandler = (mapping) => {
        setMapping(mapping)
    }
    const cancelHandler = () => {
        setMapping(null)
    }

    useEffect(() => {
        if (mappings.length === 0) {
            console.log("no mappings")
            fetchHandler(maps)
        }
        if (mappings) {
            setMapOptions(mappings.map((mapping) => (<ButtonMap
                key={mapping.id}
                id={mapping.id}
                mapping={mapping}
                onClickHandler={onClickHandler.bind(null, mapping)}
                name={mapping.name}
            />)))
            // if () {}
        }
    }, [mappings])


    return (
        <Fragment>
            {!mapping &&< button className="btn btn-default btn-dark" onClick={fetchHeaderData}>Headers</button>}
            {!mapping && mapOptions}
            {mapping && <UserLog setMapping={setMapping} mapping={mapping} />}
        </Fragment>
    )
}

export default SystemConfig


// useEffect(() => {
//     if (data && data.length > 0) {
//         console.log(data) 
//         dispatch(loadTableData({ table:"userprofile", content: data, restrictions: restrictions }))
//         dispatch(filterItems(query))
//     } else {
//         // console.log("fetching bugs")
//         fetchData('userprofile')
//     }
// }, [data])
{/* <div className="row">
                <button className="btn btn-default btn-dark" onClick={fetchHandler} title={"fetch data."}>
                    <span className="bi bi-collection">Fetch Data</span>
                </button>
            </div> */}