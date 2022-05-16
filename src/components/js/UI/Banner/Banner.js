import CardJ from "../CardJ";
//import classes from 'Banner.module.css';
const Banner = (props) => {
    return (
        <CardJ>
            <div>
                <span className={`bi bi-${props.banner}`} style={{ fontSize: "3rem" }} />
            </div>
        </CardJ>
    )
}

export default Banner;