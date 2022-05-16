import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CardJ from '../../UI/CardJ';
import Field from '../../UI/Field/Field';
import FieldArea from '../../UI/Field/FieldArea';

const CheckoutPayment = (props) => {
  const [fieldEdit, setFieldEdit] = useState(props.fieldEdit);
  const accnameref = useRef()
  const cardnrref = useRef()
  const cardcvcref = useRef()
  const expiryref = useRef()
  const coderef = useRef()
  const fieldEditHandler = () => {
    setFieldEdit(!fieldEdit);
  }
  const submitHandler = (props) => {

  }
  return (
    <Fragment>
      <div className='col-sm'>
        <form onSubmit={submitHandler}>
          <div className='row'>
            <Field ref={accnameref} icon="bank" input={{ className: 'form-control', type: 'text', id: 'accname', placeholder: 'Account Name', readOnly: !fieldEdit, }} />
          </div>
          <div className='row'>
            <Field ref={cardnrref} icon="credit-card-2-front" input={{ className: 'form-control', type: 'text', id: 'cardnr', placeholder: 'Card Number.', readOnly: !fieldEdit, }} />
          </div>
          <div className='row'>
            <Field ref={cardcvcref} icon="credit-card-2-back" input={{ className: 'form-control', type: 'text', id: 'cvcnr', placeholder: 'Card CVC', readOnly: !fieldEdit, }} />
          </div>
          <div className='row'>
            <Field ref={expiryref} icon="calendar-event" input={{ className: 'form-control', type: 'text', id: 'expiry', placeholder: 'Expiry Date', readOnly: !fieldEdit, }} />
          </div>
        </form>
      </div>
    </Fragment >
  );
};

export default CheckoutPayment
  // < div className = 'row' >
  //   <Field ref={coderef} icon="terminal" input={{ className: 'form-control', type: 'text', id: 'code', placeholder: 'Code', readOnly: fieldEdit, }} />
  //         </div >