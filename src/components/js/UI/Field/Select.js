import { forwardRef } from "react";

const Select = forwardRef((props, ref) => {
    return (

        <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
                <span className={`bi bi-${props.icon}`} />
            </div>
            <select ref={ref} {...props.select} onChange={props.onSelectChange}>
                {props.options.map(option => (<option key={option}>{option}</option>))}
            </select>
        </div>
    );
});
export default Select;
/*<props.input 
ref={ref} 
className='form-control' 
type='text' id='email' 
placeholder='Email' 
defaultValue={user.email} 
readOnly={fieldEdit} />*/