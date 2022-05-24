import CardJ from "../../../../components/js/UI/CardJ"

const Caption = (props) => {
    return (
        <CardJ>
            <div>
                <h1>{props.caption}</h1>
            </div>
        </CardJ>
    )
}

export default Caption