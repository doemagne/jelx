import { forwardRef, Fragment } from "react";
import { useDispatch } from "react-redux";

// const FieldState = forwardRef((props, ref) => {
const FieldState = (props) => {
    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        props.setState(e.target.value)
        props.stateHandler(e.target.value)
        // console.log(props.state)
    }
    return (
        <Fragment>
            <div className='input-group mb-2'>
                <div className='input-group-prepend'></div>
                <div className='input-group-text'>
                    <span className={`bi bi-${props.icon}`} />
                </div>
                <input {...props.input} onChange={onChangeHandler} />
            </div>
        </Fragment>
    );
};
export default FieldState;
