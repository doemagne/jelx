import { useRef, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { delayRequest } from "../../../../store/redux/action/Request";
import InputJ from "../../UI/InputJ";
import classes from './ItemForm.module.css';
const ItemFormJ = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();
    const navigator = useNavigate()
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        /*if (
            enteredAmount.trim().length === 0 || 
            enteredAmountNumber < 1 || 
            enteredAmountNumber > 50) {
                setAmountIsValid(false);
                return;
        }*/
        props.onAddToCart(enteredAmountNumber);
    };

    const viewItemHandler = async () => {
        props.setItemDetailHandler()
        // delayRequest(100)
        navigator("/merchandise/detail")
    };

    return (
        <Fragment>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={props.priceclass}>Price: $ {props.price}</div>
                <InputJ
                    ref={amountInputRef}
                    label={`Quantity`}
                    input={{
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: '1',
                        max: '50',
                        step: '1',
                        defaultValue: '1'
                    }} />
                
                <button type="button" onClick={viewItemHandler}>
                    <span className="bi-chat-right-text" ></span>View
                </button>
                <button>
                    <span className="bi-plus" />Add
                </button>{!amountIsValid && <p>Please enter a valid amount.</p>}
            </form>
        </Fragment>
    );
};

export default ItemFormJ