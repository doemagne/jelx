import { forwardRef } from "react";

const FieldButton = forwardRef((props, ref) => {
    return (

        <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
                <span className={`bi bi-${props.icon}`} />
            </div>
            <input ref={ref} {...props.input} type={props.itype}/>
            <button className='input-group-text' type="button" onClick={props.onClicked}>
                    <span className={`bi bi-${props.icon2}`} />
            </button>
        </div>
    );
});
export default FieldButton;
/*<props.input 
ref={ref} 
className='form-control' 
type='text' id='email' 
placeholder='Email' 
defaultValue={user.email} 
readOnly={fieldEdit} />*/