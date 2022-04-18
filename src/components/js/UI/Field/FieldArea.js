import { forwardRef } from "react";

const FieldArea = forwardRef((props, ref) => {
    return (

        <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
                <span className={`bi bi-${props.icon}`} />
            </div>
            <textarea ref={ref} {...props.textarea} />
        </div>
    );
});
export default FieldArea;
/*<props.input 
ref={ref} 
className='form-control' 
type='text' id='email' 
placeholder='Email' 
defaultValue={user.email} 
readOnly={fieldEdit} />*/
