import "./Mapping.module.css"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sortascending, sortdescending } from "../../../store/redux/slice/MappingSlice"
import MappingHeader from "./MappingHeader"
const desc = `sort-down`
const asc = `sort-up`

const MappingHead = (props) => {
    const [headersl, setHeadersl] = useState()
    // const headers = props.headers
    const headers = useSelector(state => state.mapping.mappings[props.mappingIdx].headers)
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
            setHeadersl(headers.map((header) => <MappingHeader key={header.id} headerSort={header.headerSort} onClickHandler={sortColumnHandler.bind(null, header)} headerCaption={header.headerCaption} mappingIdx={props.mappingIdx}/>))
        }
    }, [headers])

    return (
        <Fragment>
            <thead className="thead-dark">
                <tr>
                    {headersl}
                </tr>
            </thead>
        </Fragment>
    )
}

export default MappingHead
