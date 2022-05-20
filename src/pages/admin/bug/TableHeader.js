import "./Table.module.css"
import { Fragment, useEffect, useState } from "react"

const TableHeader = (props) => {

    const headerOnClickHandler = (e) => {
        props.onClickHandler()
    }
    return (
        <Fragment>
            <th scope="col">
                <span className={`bi bi-${props.headerSort}`} onClick={headerOnClickHandler}>
                    {props.headerCaption}
                </span>
            </th>
        </Fragment>
    )
}

export default TableHeader
