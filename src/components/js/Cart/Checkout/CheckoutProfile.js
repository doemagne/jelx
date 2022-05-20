import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import CardJ from '../../UI/CardJ';
import Field from '../../UI/Field/Field';
// import FieldArea from '../../UI/Field/FieldArea';
import FieldIcon from '../../UI/Field/FieldIcon';

const CheckoutProfile = (props) => {
  const [fieldEdit, setFieldEdit] = useState(false);
  const profile = useSelector(state => state.user.profile)
  const nameref = useRef()
  const phoneref = useRef()
  const fieldEditHandler = () => {
    setFieldEdit(!fieldEdit);
  }
  return (
    <Fragment> {profile && 
        <div className='col'>
          <div className='row'>
            <Field ref={nameref} icon="person-fill" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Name', defaultValue: profile.name, readOnly: props.fieldEdit, required:true}} />
          </div>
          <div className='row'>
            <Field ref={phoneref} icon="phone-fill" input={{ className: 'form-control', type: 'tel', id: 'phone', placeholder: 'Phone', defaultValue: profile.phone, readOnly: props.fieldEdit, required:true}} />
          </div>
        </div>}
    </Fragment>
  );
};

export default CheckoutProfile