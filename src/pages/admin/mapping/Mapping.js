import "./Mapping.module.css"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CardJ from "../../../components/js/UI/CardJ"
import FieldState from "../../../components/js/UI/Field/FieldState"
import { filterItems } from "../../../store/redux/slice/MappingSlice"
import MappingRow from "./MappingRow"
import MappingHead from "./MappingHead"

const Mapping = (props) => {
    const [rowsl, setRowsl] = useState()
    const [search, setSearch] = useState('')
    const rows = useSelector(state => state.mapping.mappings[props.mapIdx].items)
    const headers = useSelector(state => state.mapping.mappings[props.mapIdx].headers)
    const q = useSelector(state => state.mapping.mappings[props.mapIdx].query)
    const dispatch = useDispatch()

    const searchHandler = (query) => {
        dispatch(filterItems({ query: query, map: props.mapIdx }))

    }
    const defaultClickHandler = (item) => {
        props.defaultClickHandler(item)
    }

    const onClickSearchHandler = () => {
        setSearch("")
        console.log(search)
        dispatch(filterItems({ query: "", map: props.mapIdx }))
    }

    let baricon = q.length > 0 ? "arrow-clockwise" : "search"


    useEffect(() => {
        // console.log("setting")
        if (rows) {
            // console.log("rows")
            setRowsl(rows.map((item) => (<MappingRow headers={headers} key={item.id} celldata={item} onClickHandler={defaultClickHandler.bind(null, item)} />)))
        }
    }, [rows])


    return (
        <Fragment>
            <CardJ>
                <div className="tcontrol">
                    <form>
                        <span className="row">
                            <span className="col">
                            </span>
                            <span className="col">
                                <FieldState filterCount={rows.length} onClickHandler={onClickSearchHandler} stateHandler={searchHandler} state={search} setState={setSearch} icon={baricon} input={{ className: 'form-control', type: 'text', id: 'search', placeholder: 'Search', defaultValue: q || search, readOnly: false, }} />
                            </span>
                            <span className="col">
                            </span>
                        </span>
                    </form>
                </div>
                <table className="table table-sm table-striped">
                    <MappingHead headers={props.data.headers} mappingIdx={props.data.id} />
                    <tbody className="table-hover">{rowsl}</tbody>
                </table>
            </CardJ>
        </Fragment>
    )
}

export default Mapping

    // const rows = useSelector(state => state.mapping.mappings[props.mapIdx].items)
    // const rows = props.data.items
    // const headers = props.data.headers
    // const q = useSelector(state => state.mapping.mapping.query)
    // const q = props.data.query

    // const [,] = useState()
