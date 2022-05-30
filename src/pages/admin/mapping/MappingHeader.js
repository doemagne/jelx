import "./Mapping.module.css"
import { Fragment, useEffect, useState } from "react"

const MappingHeader = (props) => {

    const headerOnClickHandler = (e) => {
        props.onClickHandler()
    }
    return (
        <Fragment>
            <th scope="col"  onClick={headerOnClickHandler}>
                <span className={`bi bi-${props.headerSort}`}>
                    {props.headerCaption}
                </span>
            </th>
        </Fragment>
    )
}

export default MappingHeader
