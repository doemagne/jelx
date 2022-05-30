const ButtonMap = (props) => {
    const onClickHandler = () => {
        props.onClickHandler(props.mapping)
    }
    return (
        <button className="btn btn-default btn-dark" name={props.name} onClick={onClickHandler}>
            {props.mapping.name}
        </button>)
}

export default ButtonMap