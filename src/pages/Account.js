import { useLiveQuery } from 'dexie-react-hooks';
import indexdb from '../store/indexdb/indexdb';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classes from './Account.module.css';
import CardJ from '../components/js/UI/CardJ';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Field from '../components/js/UI/Field/Field';
import FieldIcon from '../components/js/UI/Field/FieldIcon';
import Select from '../components/js/UI/Field/Select';
import AccountControls from './AccountControls';

let acc = {};
let cart = {};
let cartitems = [];
const Account = (props) => {
  const user = useSelector(state => state.user)
  const address = useSelector(state => state.user.address)
  const [imgSrc, setImgSrc] = useState();
  const [gender, setGender] = useState('male');
  const [fieldEdit, setFieldEdit] = useState(true);
  const account = useLiveQuery(() => indexdb.transport.where({ id: 1 }).first());
  const imageref = useRef()
  const genderref = useRef()
  const fetchAccount = async () => {
    //const content = account.content;
    console.log(user);
    console.log(account);
    if (account) {
      acc = account.content;
      if (account.content.cart) {
        cart = account.content.cart;
        if (account.content.cartitems) {
          cartitems = account.content.cart.items;
        }
      }
      console.log(acc);
    }
  }

  const fieldEditHandler = () => {
    //setFieldEdit(false);
    setFieldEdit(!fieldEdit);
  }
  const genderHandler = () => {
    setGender(genderref.current.value)
  }
  const fetchTransport = useCallback(async () => {
    fetchAccount()
  }, [])

  let cdate = new Date();
  let ye = cdate.getFullYear();
  let mo = cdate.getMonth() + 1;
  let da = cdate.getDate();
  let ms = `${mo < 10 ? "0" + mo : mo}`
  let ds = `${da < 10 ? "0" + da : da}`
  let date = `${ye}-${ms}-${ds}`;
  //let date = currentDate.getUTCFullYear().toLocaleString()+"-"+currentDate.getUTCMonth().toLocaleString()+"-"+currentDate.getDate().toLocaleString();
  //let date = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
  //currentDate.getHours() + ";" +
  //currentDate.getMinutes() + ";" +
  //currentDate.getSeconds() + ";";
  //let isodate = date.toISOString().substring(0,10);
  const displayDateHandler = (e) => {
    console.log(e.target.value)
    console.log(date)

  }
  const ImageSrcHandler = () => {
    setImgSrc(URL.createObjectURL(imageref.current.files[0]));
  };

  useEffect(() => {
    fetchTransport()
  }, []);



  return (
    <Fragment>
      {!props.authenticated && <Navigate to="/" />}
      <CardJ>
        <AccountControls fieldEditHandler={fieldEditHandler} fieldEdit={fieldEdit}/>
      </CardJ>
      <section>
        <CardJ>
          <div className='text-center'>
            <h2>{user.name}</h2>
          </div>
        </CardJ>
      </section>
      <section>
        <CardJ>
          <div className='row'>
            <div className='col-sm'>
              <div className='row'>
                <div className={classes.imgcarry}>
                  <div className="input-group-text">
                    <span className="bi bi-camera2"></span>
                    <input ref={imageref} className="btn btn-default" id="image" placeholder="Image" type="file" required onChange={ImageSrcHandler} style={{ fontSize: "0.5rem", padding: "0rem .75rem" }}></input>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={classes.imgcarry}>
                  <img src={imgSrc} onError={null} className={`${classes.imgbackup} img-fluid`} />
                </div>
              </div>
            </div>
            <div className='col-sm'>
              <div className='row'>
                <FieldIcon icon2={`gender-${gender}`} icon="person-fill" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Name', defaultValue: user.name, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="person-circle" input={{ className: 'form-control', type: 'text', id: 'username', placeholder: 'Username', defaultValue: user.username, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="at" input={{ className: 'form-control', type: 'email', id: 'email', placeholder: 'Email', defaultValue: user.email, readOnly: fieldEdit, }} />
              </div>
              {!fieldEdit && <div className='row'>
                <Select icon={`gender-${gender}`} options={['male', 'female']} ref={genderref} select={{ className: 'form-control', id: 'gender', defaultValue: 'male', readOnly: fieldEdit, }} onSelectChange={genderHandler} />
              </div>}
              <div className='row'>
                <Field icon="phone-fill" input={{ className: 'form-control', type: 'tel', id: 'phone', placeholder: 'Phone', defaultValue: user.phone, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="calendar-event" input={{ className: 'form-control', type: 'date', id: 'birthdate', placeholder: 'Birth Date', defaultValue: user.birthdate, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="translate" input={{ className: 'form-control', type: 'text', id: 'language', placeholder: 'Language', defaultValue: user.language, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="diagram-3-fill" input={{ className: 'form-control', type: 'text', id: 'ipaddress', placeholder: 'IP Address', defaultValue: user.ipaddress, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="link-45deg" input={{ className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', defaultValue: user.uid, readOnly: true, }} />
              </div>
            </div>

          </div>
        </CardJ>
      </section>
      {address && <section>
        <CardJ>
          <div className='row'>
            <div className='col-sm'>
              <div className='row'>
                <div>
                  <span className="bi bi-geo" style={{ fontSize: "5rem" }} />
                  <br />
                </div>
              </div>
            </div>
            <div className='col-sm'>
              <div className='row'>
                <Field icon="signpost" input={{ className: 'form-control', type: 'text', id: 'street', placeholder: 'Street', defaultValue: address.street, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="cursor" input={{ className: 'form-control', type: 'text', id: 'suburb', placeholder: 'Suburb', defaultValue: address.suburb, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="building" input={{ className: 'form-control', type: 'text', id: 'city', placeholder: 'City', defaultValue: address.city, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="globe" input={{ className: 'form-control', type: 'text', id: 'country', placeholder: 'Country', defaultValue: address.country, readOnly: fieldEdit, }} />
              </div>
              <div className='row'>
                <Field icon="postage" input={{ className: 'form-control', type: 'text', id: 'postalcode', placeholder: 'Postal Code', defaultValue: address.postalcode, readOnly: fieldEdit, }} />
              </div>
            </div>
          </div>
        </CardJ>
      </section>}
      <CardJ>
        <div>
          <span className="bi bi-person-circle" style={{ fontSize: "5rem" }} />
          <br />
        </div>
      </CardJ>
    </Fragment>
  );
}

export default Account;