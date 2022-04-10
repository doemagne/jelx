import { forwardRef } from "react";

const Field = forwardRef((props, ref) => {
    return (

        <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
                <span className={`bi bi-${props.icon}`} />
            </div>
            <input ref={ref} {...props.input} />
        </div>
    );
});
export default Field;
/*<props.input 
ref={ref} 
className='form-control' 
type='text' id='email' 
placeholder='Email' 
defaultValue={user.email} 
readOnly={fieldEdit} />*/