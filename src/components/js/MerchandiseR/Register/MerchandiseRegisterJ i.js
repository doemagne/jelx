import { useRef, useState } from "react";
import CardJ from "../../UI/CardJ";
import InputRequired from "../../../UI/Form/InputRequired";
import InputArea from "../../../UI/Form/InputArea";
import Button from "../../../UI/Button/Button";
import ModalJ from "../../UI/ModalJ";
//import TextFieldJ from "../../UI/TextFieldJ";
//import classes from '../../UI/TextField.module.css';


const MerchandiseRegisterJi = () => {
    const [validName, setValidName] = useState(true)
    const [validDescription, setValidDescription] = useState(true)
    const [validPrice, setValidPrice] = useState(true)
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemPrice, setItemPrice] = useState('')

    return (
        <ModalJ>
            <form>
                <InputRequired
                    txt={'Name'}
                    val={itemName}
                    valid={validName}
                    setValid={setValidName}
                    inputtype={'text'}
                    setTxt={setItemName}
                />
                <InputArea
                    txt={'Description'}
                    val={itemDescription}
                    valid={validDescription}
                    setValid={setValidDescription}
                    setTxt={setItemDescription}
                />
                <InputRequired
                    txt={'Price'}
                    val={itemPrice}
                    valid={validPrice}
                    setValid={setValidPrice}
                    inputtype={'number'}
                    setTxt={setItemPrice}
                />
                <Button className="w-100 btn btn-lg btn-primary" type="submit">Submit</Button>
            </form>
        </ModalJ>
    );
};

export default MerchandiseRegisterJi;