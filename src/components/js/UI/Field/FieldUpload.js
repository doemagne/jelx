import { forwardRef, Fragment } from "react";

const FieldUpload = forwardRef((props, ref) => {
    const onChangeHandler = (item) => {
        props.onChangeHandler(item)
    }
    return (
        <Fragment>
            <div className="input-group-text">
                <span className="bi bi-camera2"></span>
                <input
                    onChange={onChangeHandler}
                    ref={ref}
                    className="btn btn-default"
                    id="mapimage"
                    placeholder="Image"
                    type="file"
                    style={{ fontSize: "0.5rem", padding: "0rem .75rem" }}>
                </input>
            </div>
        </Fragment>
    );
});



export default FieldUpload;


// <div className={classes.imgcarry}>
//     <div className="input-group-text">
//         <span className="bi bi-camera2"></span>
//         <input
//             ref={imageref}
//             className="btn btn-default"
//             id="image"
//             placeholder="Image"
//             type="file"
//             required
//             onChange={ImageSrcHandler}
//             style={{ fontSize: "0.5rem", padding: "0rem .75rem" }}></input>
//     </div>
// </div>

/*<props.input 
ref={ref} 
className='form-control' 
type='text' id='email' 
placeholder='Email' 
defaultValue={user.email} 
readOnly={fieldEdit} />*/