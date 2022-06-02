import { forwardRef } from "react";

const FieldDefault = forwardRef((props, ref) => {
    const onChangeHandler = (item) => {
        props.onChangeHandler(item)
    }
    return (
        <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
                <span className={`bi bi-${props.icon}`} >{props.placeholder}</span>
            </div>
            <input ref={ref} {...props.input} onChange={onChangeHandler}/>
        </div>
    );
});
export default FieldDefault;
/*<props.input 
ref={ref} 
className='form-control' 
type='text' id='email' 
placeholder='Email' 
defaultValue={user.email} 
readOnly={fieldEdit} />*/