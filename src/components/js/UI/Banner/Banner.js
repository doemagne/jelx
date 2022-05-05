import CardJ from "../CardJ";
//import classes from 'Banner.module.css';
const Banner = (props) => {
    return (
        <CardJ>
            <div>
                <span className={`bi bi-${props.banner}`} style={{ fontSize: "5rem" }} />
            </div>
        </CardJ>
    )
}

export default Banner;