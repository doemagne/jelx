import { forwardRef, Fragment, useState } from "react";
import { prefixCaption } from "../../../../store/redux/slice/MappingSlice";
import Field from "./Field";
import FieldArea from "./FieldArea";
import FieldDefault from "./FieldDefault";

const FieldHeader = forwardRef((props, ref) => {
    const [inputType, setInputType] = useState()
    const header = props.header
    // if (props.current === true || props.current === false || props.current === "true" || props.current === "false") {
    //     setInputType("checkbox")
    // }
    const onChangeHandler = (header) => {
        props.onChangeHandler(header)

    }

    if (props.current === true || props.current === false || props.current === "true" || props.current === "false") {
        return (<Fragment>
            <div className='input-group mb-2'>
                <div className='input-group-prepend'></div>
                <div className='input-group-text'>
                    <span className={`bi bi-${header.icon}`}> {` ${prefixCaption(header.headerCaption)}: `} </span>
                    <div className="form-check form-switch">
                        <input ref={ref} className="form-switch form-check-input" id="active" type="checkbox" onChange={onChangeHandler}/>
                    </div>
                </div>
                {/* <label className="form-check-label" htmlFor="active">{prefixCaption(header.headerCaption)}</label> */}
            </div>
        </Fragment >)
    }
    if (header.fieldType === "Field") {
        return (<FieldDefault ref={ref} icon={header.icon} onChangeHandler={onChangeHandler} placeholder={prefixCaption(header.headerCaption)}
            input={{
                className: 'form-control',
                type: header.inputType,
                id: props.headerCaption,
                placeholder: prefixCaption(header.headerCaption),
                defaultValue: props.current,
                readOnly: header.readOnly,
            }} />)
    }
    if (header.fieldType === "FieldArea") {
        return (<FieldArea ref={ref} icon={header.icon}
            textarea={{
                className: 'form-control',
                type: 'text',
                id: header.headerCaption,
                placeholder: header.headerCaption,
                defaultValue: props.current,
                readOnly: header.readOnly,
            }} />)
    }



});
export default FieldHeader

/*
return (<Fragment>
            <div className="form-floating form-fl">
                <div className="form-check form-switch">
                    <input ref={ref} className="form-check-input" id="active" type="checkbox" />
                    <label className="form-check-label" htmlFor="active">{prefixCaption(header.headerCaption)}</label>
                </div>
            </div>
        </Fragment>)
    //  
input={{
        className: 'form-control',
                    type: 'text',
                    id: `${header.headerCaption}`,
                    placeholder: `${header.headerCaption}`,
                    defaultValue: `${current[header.headerCaption]}`,
                    readOnly: false,
                }} 
*/