
import React, { useState } from 'react';
const InputArea = (props) => {
    let [val, setVal] = useState("");
    const keytrack = (e) => {
        if (e.target.value.trim().length > 0) {
            props.setValid(true);
        }
        val = e.target.value;
        setVal(val);
        props.setTxt(val);
        console.log(`props.valid ${props.valid}`);
    }
    const fid = `floating${props.txt.trim()}`;
    return (
        <div className={`form-floating form-fl ${props.valid ? '' : 'invalid'}`}>
            <textarea
                className={`form-control`}
                id={fid}
                placeholder={props.txt}
                onChange={keytrack}
                value={props.val}
                style={{
                    borderColor: !(props.valid) ? 'red' : '#ced4da',
                    background: !(props.valid) ? '#ff001840' : '#ffffff'
                }}
                required
            />
            <label
                style={{
                    color: !(props.valid) ? 'red' : 'inherit'
                }}
                htmlFor={fid}>
                {props.txt}
            </label>
        </div>
    );
}
export default InputArea;