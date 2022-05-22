import "./Table.module.css"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { Navigate, useNavigate } from "react-router-dom"
// import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
// import { fetchBugMap } from "../../../store/redux/action/BugAction"
// import { delayRequest } from "../../../store/redux/action/Request"
// import BugRow from "../bug/BugRow"
import TableHead from "./TableHead"
import TableRow from "./TableRow"
// import Field from "../../../components/js/UI/Field/Field"
import FieldState from "../../../components/js/UI/Field/FieldState"
import { filterItems, filterItemsI } from "../../../store/redux/slice/TableSlice"
// import { setCurrent } from "../../../store/redux/slice/BugSlice"

const Table = (props) => {
    const [rowsl, setRowsl] = useState()
    const [search, setSearch] = useState('')
    // const searchref = useRef()
    const rows = useSelector(state => state.table.items)
    const q = useSelector(state => state.table.query)

    const dispatch = useDispatch()

    const searchHandler = (query) => {
        // console.log(`${query}:searching...`)
        dispatch(filterItems(query))

    }
    const defaultClickHandler = (item) => {
        props.defaultClickHandler(item)
    }
    useEffect(() => {
        if (q.length > 0) {
            // searchHandler(q)
        }
        if (rows) {
            setRowsl(rows.map((item) => (<TableRow key={item.id} celldata={item} onClickHandler={defaultClickHandler.bind(null, item)} />)))
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
                                <FieldState stateHandler={searchHandler} state={search} setState={setSearch} icon="search" input={{ className: 'form-control', type: 'text', id: 'search', placeholder: 'Search', defaultValue: q || search, readOnly: false, }} />
                            </span>
                            <span className="col">
                            </span>
                        </span>
                    </form>
                </div>
                <table className="table table-light table-striped table-hover">
                    <TableHead />
                    <tbody>{rowsl}</tbody>
                </table>
            </CardJ>
        </Fragment>
    )
}

export default Table