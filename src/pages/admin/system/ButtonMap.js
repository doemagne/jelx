import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { transportTableX } from "../../../store/redux/slice/MappingSlice"

const ButtonMap = (props) => {
    const dispatch = useDispatch()
    const onClickHandler = () => {
        props.onClickHandler(props.mapping)
    }
    const m = props.mapping

    // useEffect(() => {
    //     dispatch(transportTableX({
    //         table: `${m.name} Headers`,
    //         content: m.headers,
    //         restrictions: []
    //     }))
    // },[])

    return (
        <button className="btn btn-default btn-dark" name={props.name} onClick={onClickHandler}>
            {props.mapping.name}
        </button>)
}

export default ButtonMap