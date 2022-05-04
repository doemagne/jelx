import { ServerURL } from '../constraint/ServerURL';
import { useLiveQuery } from 'dexie-react-hooks';
import indexdb from '../store/indexdb/indexdb';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classes from './Account.module.css';
import CardJ from '../components/js/UI/CardJ';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Field from '../components/js/UI/Field/Field';
import FieldIcon from '../components/js/UI/Field/FieldIcon';
import FieldButton from '../components/js/UI/Field/FieldButton';
import FieldArea from '../components/js/UI/Field/FieldArea';
import Select from '../components/js/UI/Field/Select';
import AccountControls from './AccountControls';
import { setloading } from '../store/redux/slice/UISlice';
import { updateUserCredential } from '../store/redux/action/userAction';
import { enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256';

let acc = {};
let cart = {};
let cartitems = [];
const Account = (props) => {
  window.sessionStorage.setItem("window", window.location.pathname)
  const dispatch = useDispatch()
  const [pV, setPV] = useState(false);
  const [passwordText, setPasswordText] = useState('password')
  const [eye, setEye] = useState('eye')
  const [togglePasswordChange, setTogglePasswordChange] = useState(false)
  const [imgSrc, setImgSrc] = useState();
  const [gender, setGender] = useState('male');
  const [fieldEdit, setFieldEdit] = useState(true);
  const user = useSelector(state => state.user);
  const address = useSelector(state => state.user.address);
  const profile = useSelector(state => state.user.profile);
  const account = useLiveQuery(() => indexdb.transport.where({ id: 1 }).first());
  const passwordref = useRef();
  const confirmpasswordref = useRef();
  const imageref = useRef()
  const phoneref = useRef()
  const languageref = useRef()
  const birthdateref = useRef()
  const emailref = useRef()
  const usernameref = useRef()
  const nameref = useRef()
  const inforef = useRef()
  const streetref = useRef()
  const suburbref = useRef()
  const cityref = useRef()
  const countryref = useRef()
  const postalcoderef = useRef()
  const genderref = useRef()
  const uidref = useRef()
  let token = window.sessionStorage.getItem("token")

  const togglePasswordVisibility = () => {
    setPV(!pV)
    if (pV) {
      setEye('eye-slash')
      setPasswordText('text')
    } else {
      setEye('eye')
      setPasswordText('password')
    }
  }

  const togglePasswordChangeHandler = (e) => {
    e.preventDefault();
    setTogglePasswordChange(!togglePasswordChange);
  }
  const submitCredentialHandler = () => {
    const userData = {
      username: usernameref.current.value,
      password: sha256(passwordref.current.value).toString(enc.Hex),
      confirmpassword: sha256(confirmpasswordref.current.value).toString(enc.Hex),
    };
    dispatch(updateUserCredential(userData,token))
    setTogglePasswordChange(!togglePasswordChange)
  }
  const submitUpdateHandler = async () => {
    dispatch(setloading(true));
    const addressData = {
      uid: address.uid,
      street: streetref.current.value,
      suburb: suburbref.current.value,
      city: cityref.current.value,
      country: countryref.current.value,
      postalcode: postalcoderef.current.value,
    };
    const profileData = {
      uid: uidref.current.value,
      name: nameref.current.value,
      username: usernameref.current.value,
      phone: phoneref.current.value,
      email: emailref.current.value,
      language: languageref.current.value,
      birthdate: birthdateref.current.value,
      gender: genderref.current.value,
      information: inforef.current.value,
      attachment: imageref.current.files.length > 0,
    };
    const profileconfig = {
      attachment: imageref.current.files.length > 0,
    }
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 5000);
    const formdata = new FormData();
    formdata.append("confuration", JSON.stringify(profileconfig))
    formdata.append("address", JSON.stringify(addressData));
    formdata.append("profile", JSON.stringify(profileData));
    //if (togglePasswordChange && profileconfig.credentials) {
      //formdata.append("credential", JSON.stringify(userData));
    //}
    if (profileconfig.attachment) {
      formdata.append("photo", imageref.current.files[0]);
    }
    try {
      const stimulus = await fetch(ServerURL + '/api/user/update', {
        method: 'PUT',
        headers: { 
            "X-Csrf-Token": token
        },
        body: formdata,
        signal: ctrl.signal,
        credentials: "include",
      });
      console.log(stimulus.status);
      dispatch(setloading(false));
    } catch (error) {
      console.log("An error occured when uploading the form data.", error);
      dispatch(setloading(false));
    }
  }

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
  let ms = `${mo < 10 ? "0" + mo : mo}`;
  let ds = `${da < 10 ? "0" + da : da}`;
  let date = `${ye}-${ms}-${ds}`;
  const displayDateHandler = (e) => {
    console.log(e.target.value)
    console.log(date)

  }
  const ImageSrcHandler = () => {
    console.log(imageref.current.files.length)
    if (imageref.current.files.length > 0) {
      setImgSrc(URL.createObjectURL(imageref.current.files[0]));
    } else {
      if (profile) {
        setImgSrc(`${ServerURL}/assets/media/profile/${profile.uid}/i.png`);
      }
    }
  };

  useEffect(() => {
    fetchTransport()
    ImageSrcHandler()
  }, []);



  return (
    <Fragment>
      {!props.authenticated && <Navigate to="/" />}
      <CardJ>
        <AccountControls submitCredentialHandler={submitCredentialHandler} passwordToggle={togglePasswordChange} fieldEditHandler={fieldEditHandler} fieldEdit={fieldEdit} onSubmitUpdate={submitUpdateHandler} togglePasswordChangeHandler={togglePasswordChangeHandler} />
      </CardJ>
      {profile && 
      <section>
        <CardJ>
          <div className='text-center'>
            <h2>{profile.username}</h2>
          </div>
        </CardJ>
      </section>
      }
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
              {profile &&
                <div className='row'>
                  <div className={classes.imgcarry}>
                    <img src={`${ServerURL}/assets/media/profile/${profile.uid}/qrcode.png`} onError={null} className={`${classes.imgbackup} img-fluid`} />
                  </div>
                </div>}
            </div>
            <div className='col-sm'>
              {
                profile &&
                <Fragment>
                  <div className='row'>
                    <FieldIcon ref={nameref} icon2={`gender-${gender}`} icon="person-fill" input={{ className: 'form-control', type: 'text', id: 'name', placeholder: 'Name', defaultValue: profile.name, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={emailref} icon="at" input={{ className: 'form-control', type: 'email', id: 'email', placeholder: 'Email', defaultValue: profile.email, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={usernameref} icon="person-circle" input={{ className: 'form-control', type: 'text', id: 'username', placeholder: 'Username', defaultValue: profile.username, readOnly: fieldEdit, }} />
                  </div>
                  {
                    togglePasswordChange &&
                    <Fragment>
                      <div className='row'>
                        <FieldButton onClicked={togglePasswordVisibility} ref={passwordref} icon2={eye} icon="key" input={{ className: 'form-control', type: { passwordText }, id: 'password', placeholder: 'Password', defaultValue: '', readOnly: false, }} itype={passwordText} />
                      </div>
                      <div className='row'>
                        <FieldButton onClicked={togglePasswordVisibility} ref={confirmpasswordref} icon2={eye} icon="key-fill" input={{ className: 'form-control', type: { passwordText }, id: 'confirmpassword', placeholder: 'Confirm Password', defaultValue: '', readOnly: false, }} itype={passwordText} />
                      </div>
                      <div className='row'>
                      </div>
                    </Fragment>
                  }
                  {
                    !fieldEdit && <div className='row'>
                      <Select icon={`gender-${gender}`} options={['male', 'female']} ref={genderref} select={{ className: 'form-control', id: 'gender', defaultValue: profile.gender, readOnly: fieldEdit, }} onSelectChange={genderHandler} />
                    </div>

                  }
                  <div className='row'>
                    <Field ref={phoneref} icon="phone-fill" input={{ className: 'form-control', type: 'tel', id: 'phone', placeholder: 'Phone', defaultValue: profile.phone, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={birthdateref} icon="calendar-event" input={{ className: 'form-control', type: 'date', id: 'birthdate', placeholder: 'Birth Date', defaultValue: profile.birthdate, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={languageref} icon="translate" input={{ className: 'form-control', type: 'text', id: 'language', placeholder: 'Language', defaultValue: profile.language, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field icon="diagram-3-fill" input={{ className: 'form-control', type: 'text', id: 'ipaddress', placeholder: 'IP Address', defaultValue: profile.ipaddress, readOnly: true, }} />
                  </div>
                  <div className='row'>
                    <Field ref={uidref} icon="link-45deg" input={{ className: 'form-control', type: 'text', id: 'uid', placeholder: 'UID', defaultValue: profile.uid, readOnly: true, }} />
                  </div>
                  <div className='row'>
                    <FieldArea ref={inforef} icon="info-circle" textarea={{ className: 'form-control', type: 'text', id: 'information', placeholder: 'Information', defaultValue: profile.information, readOnly: fieldEdit, }} />
                  </div>
                </Fragment>
              }
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
              {
                fieldEdit &&
                <div className='row'>
                  <FieldArea ref={streetref} icon="signpost" textarea={{ className: 'form-control', type: 'text', id: 'addressname', placeholder: 'Address Name', defaultValue: address.name, readOnly: true, }} />
                </div>
              }
              {
                !fieldEdit &&
                <Fragment>
                  <div className='row'>
                    <Field ref={streetref} icon="signpost" input={{ className: 'form-control', type: 'text', id: 'street', placeholder: 'Street', defaultValue: address.street, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={suburbref} icon="cursor" input={{ className: 'form-control', type: 'text', id: 'suburb', placeholder: 'Suburb', defaultValue: address.suburb, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={cityref} icon="building" input={{ className: 'form-control', type: 'text', id: 'city', placeholder: 'City', defaultValue: address.city, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={countryref} icon="globe" input={{ className: 'form-control', type: 'text', id: 'country', placeholder: 'Country', defaultValue: address.country, readOnly: fieldEdit, }} />
                  </div>
                  <div className='row'>
                    <Field ref={postalcoderef} icon="postage" input={{ className: 'form-control', type: 'text', id: 'postalcode', placeholder: 'Postal Code', defaultValue: address.postalcode, readOnly: fieldEdit, }} />
                  </div>
                </Fragment>
              }
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