import React from "react";
import classes from './TextInput.module.css';

const TextInputJ = React.forwardRef((props, ref) => {
    return (
            <div className={classes[`form-floating`] + classes[`form-fl`]}>
                <input ref={ref} {...props.input}/>
                <label htmlFor={props.input.id}>{props.label}</label>
            </div>
    );
});

export default TextInputJ;