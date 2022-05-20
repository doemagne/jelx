import "./Table.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import Banner from "../../../components/js/UI/Banner/Banner"
import CardJ from "../../../components/js/UI/CardJ"
import { fetchBugMap } from "../../../store/redux/action/BugAction"
import { delayRequest } from "../../../store/redux/action/Request"
import BugRow from "./BugRow"
import TableHeader from "./TableHeader"
import { sortascending, sortdescending } from "../../../store/redux/slice/TableSlice"
const desc = `sort-down`
const asc = `sort-up`

const TableHead = (props) => {
    const [headersl, setHeadersl] = useState()
    const [idSort, setIdSort] = useState(desc)
    const headers = useSelector(state => state.table.headers)
    const dispatch = useDispatch()
    const sortColumnHandler = (header) => {
        if (header.headerSort == asc) {
            dispatch(sortascending(header))
        } else if (header.headerSort == desc) {
            dispatch(sortdescending(header))
        }
    }

    useEffect(() => {
        if (headers && headers.length > 0) {
            setHeadersl(headers.map((header) => <TableHeader key={header.id} headerSort={header.headerSort} onClickHandler={sortColumnHandler.bind(null, header)} headerCaption={header.headerCaption} />))
        }
    }, [headers])

    return (
        <Fragment>
            <thead>
                <tr>
                    {headersl}
                </tr>
            </thead>
        </Fragment>
    )
}

export default TableHead
