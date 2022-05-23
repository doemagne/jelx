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
    const onClickHandler = () => {
        props.onClickHandler()
    }
    return (
        <Fragment>
            {/* <form> */}
                <div className='input-group mb-2'>
                    <div className='input-group-prepend'></div>
                    <button type="reset" className='input-group-text btn-dark' onClick={onClickHandler} value={props.state}>
                        <span className={`bi bi-${props.icon} `}>{props.filterCount}</span>
                    </button>
                    <input {...props.input} onChange={onChangeHandler} />
                </div>
            {/* </form> */}
        </Fragment>
    );
};
export default FieldState;
