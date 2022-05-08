import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggle } from "../../../../store/redux/slice/UISlice";
import classes from './ItemForm.module.css';
const ItemFormJ = props => {//KEEP props to pass item back up
    const dispatch = useDispatch();
    const selectEditHandler = async(event) => {
        event.preventDefault();
        //dispatch(toggle());
        console.log("yeilding 1");
        //props.onSelectedItemEdit(enteredAmountNumber);
        props.setItemEditable();
    };
    return (
        <Fragment>
                <Link to={"/merchandise/existing"}>
                    <button className="btn btn-default btn-outline-success" onClick={selectEditHandler}>
                        <span className="bi bi-gear"></span>
                        View
                    </button>
                </Link>
        </Fragment>
    );
};

export default ItemFormJ
/*
            <form className={classes.form} onSubmit={selectEditHandler}>
            </form>
 
const [amountIsValid, setAmountIsValid] = useState(true);

const amountInputRef = useRef();
const enteredAmount = amountInputRef.current.value;
const enteredAmountNumber = +enteredAmount;
if (
enteredAmount.trim().length === 0 || 
enteredAmountNumber < 1 || 
enteredAmountNumber > 50) {
setAmountIsValid(false);
return;
}
<InputJ
ref={amountInputRef} 
label={`Amount`} 
input={{
id: 'amount_'+props.id,
type: 'number',
min: '1',
max: '50',
step: '1',
defaultValue: '1'
}}/>
{!amountIsValid && <p>Please enter a valid amount.</p>}
 
*/