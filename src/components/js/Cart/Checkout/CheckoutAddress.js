import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CardJ from '../../UI/CardJ';
import Field from '../../UI/Field/Field';
import FieldArea from '../../UI/Field/FieldArea';

const CheckoutAddress = (props) => {
  const [fieldEdit, setFieldEdit] = useState(false);
  const streetref = useRef()
  const suburbref = useRef()
  const cityref = useRef()
  const countryref = useRef()
  const postalcoderef = useRef()

  const address = useSelector(state => state.user.address)
  const fieldEditHandler = () => {
    setFieldEdit(!fieldEdit);
  }
  return (
    <Fragment>
      {address && props.fieldEdit &&
        <div className='col-sm'>
          <div className='row'>
            <FieldArea icon="signpost" textarea={{ className: 'form-control', type: 'text', id: 'addressname', placeholder: 'Address Name', defaultValue: address.name, readOnly: true, }} />
          </div>
        </div>}
      {address && !props.fieldEdit &&
        <div className='col-sm'>
          <div className='row'>
            <Field ref={streetref} icon="signpost" input={{ className: 'form-control', type: 'text', id: 'street', placeholder: 'Street', defaultValue: address.street, readOnly: props.fieldEdit, required:true}} />
          </div>
          <div className='row'>
            <Field ref={suburbref} icon="cursor" input={{ className: 'form-control', type: 'text', id: 'suburb', placeholder: 'Suburb', defaultValue: address.suburb, readOnly: props.fieldEdit, required:true}} />
          </div>
          <div className='row'>
            <Field ref={cityref} icon="building" input={{ className: 'form-control', type: 'text', id: 'city', placeholder: 'City', defaultValue: address.city, readOnly: props.fieldEdit, required:true}} />
          </div>
          <div className='row'>
            <Field ref={countryref} icon="globe" input={{ className: 'form-control', type: 'text', id: 'country', placeholder: 'Country', defaultValue: address.country, readOnly: props.fieldEdit, required:true}} />
          </div>
          <div className='row'>
            <Field ref={postalcoderef} icon="postage" input={{ className: 'form-control', type: 'text', id: 'postalcode', placeholder: 'Postal Code', defaultValue: address.postalcode, readOnly: props.fieldEdit, required:true}} />
          </div>
        </div>}
    </Fragment>
  );
};

export default CheckoutAddress