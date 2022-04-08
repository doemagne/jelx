import { useLiveQuery } from 'dexie-react-hooks';
import indexdb from '../store/indexdb/indexdb';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classes from './Account.module.css';
import CardJ from '../components/js/UI/CardJ';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

let acc = {};
let cart = {};
let cartitems = [];
const Account = (props) => {
  const user = useSelector(state => state.user)
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
        <div className='row'>
          <div className='col'>
            <button type='button' className='btn btn-default btn-primary' onClick={fieldEditHandler}>
              <span className='bi bi-gear' />
            </button>
          </div>
          <div className='col'>
            <button type='button' className='btn btn-default btn-secondary'>
              <span className='bi bi-key' />
            </button>
          </div>
          <div className='col'>
            <button type='button' className='btn btn-default btn-danger'>
              <span className='bi bi-file-pdf-fill' />
            </button>
          </div>
          {!fieldEdit && <div className='col'>
            <button type='button' className='btn btn-default btn-success'>
              <span className='bi bi-cloud-arrow-up-fill' />
            </button>
          </div>}
        </div>
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
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-person-circle' />
                  </div>
                  <input className='form-control' type='text' id='username' placeholder='Username' defaultValue={user.username} readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-at' />
                  </div>
                  <input className='form-control' type='text' id='email' placeholder='Email' defaultValue={user.email} readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-diagram-3-fill' />
                  </div>
                  <input className='form-control' type='text' id='ipaddress' placeholder='IP Address' defaultValue="169.265.112.432" readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-link-45deg' />
                  </div>
                  <input className='form-control' type='text' id='uid' placeholder='UID' defaultValue={user.uid} readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-file-earmark-person' />
                  </div>
                  <input className='form-control' type='text' id='name' placeholder='Name' defaultValue={user.name} readOnly={fieldEdit} />
                  <div className='input-group-text'>
                    <span className={`bi bi-gender-${gender}`} />
                  </div>
                </div>
              </div>
              {!fieldEdit && <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className={`bi bi-gender-${gender}`}></span>
                  </div>
                  <select ref={genderref} className='form-control' id='name' readOnly={fieldEdit} defaultValue="male" onChange={genderHandler}>
                    <option>female</option>
                    <option>male</option>
                  </select>
                  <div className='input-group-text'>
                  </div>
                </div>
              </div>}
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-phone' />
                  </div>
                  <input className='form-control' type='text' id='phone' placeholder='Phone' defaultValue="+09 87 5654 321" readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-calendar-event' />
                  </div>
                  <input className='form-control' type='date' id='dateofbirth' placeholder='Birth Date' defaultValue={date} readOnly={fieldEdit} onChange={displayDateHandler} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-translate' />
                  </div>
                  <input className='form-control' type='text' id='language' placeholder='Language' defaultValue="English" readOnly={fieldEdit} />
                </div>
              </div>
            </div>

          </div>
        </CardJ>
      </section>
      <section>
        <CardJ>
          <div className='row'>
            <div className='col-sm'>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-signpost' />
                  </div>
                  <input className='form-control' type='text' id='street' placeholder='Street' defaultValue="315 York Avenue" readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-cursor' />
                  </div>
                  <input className='form-control' type='text' id='suburb' placeholder='Suburb' defaultValue="Randburg" readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-building' />
                  </div>
                  <input className='form-control' type='text' id='city' placeholder='building' defaultValue="Johannesburg" readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-globe' />
                  </div>
                  <input className='form-control' type='text' id='country' placeholder='country' defaultValue="South Africa" readOnly={fieldEdit} />
                </div>
              </div>
              <div className='row'>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'></div>
                  <div className='input-group-text'>
                    <span className='bi bi-postage' />
                  </div>
                  <input className='form-control' type='text' id='postalcode' placeholder='Postal Code' defaultValue="P.O. Box: 2194" readOnly={fieldEdit} />
                </div>
              </div>
            </div>
            <div className='col-sm'>
              <div className='row'>
                <div>
                  <span className="bi bi-geo" style={{ fontSize: "5rem" }} />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </CardJ>
      </section>


      <CardJ>
        <div>
          <span className="bi bi-person-circle" style={{ fontSize: "5rem" }} />
          <br />
        </div>
      </CardJ>




      <CardJ>
        <section className={classes.profile}>
          <section>
            <div><p>UID:</p><p>{user.uid}</p></div>
            <div><p>Cart UID:</p><p>{acc.cartuid}</p></div>
          </section>
          <section>
            <div><p>Name:</p><p>{user.name}</p></div>
            <div><p>Username:</p><p>{user.username}</p></div>
          </section>
          {user.cart && (
            <section>
              <div><p>Total Items:</p><p>{user.cart.totalItems}</p></div>
              <div><p>Total Amount:</p><p>${user.cart.totalAmount}</p></div>
            </section>
          )}
        </section>
      </CardJ>
      {user.cart && (
        <section className={classes.cart}>
          <ul>
            <div className={classes.cartitem}>
              {cartitems.map((item) => (
                <li className={classes.listitem} key={item.merchandise.id}>
                  <div>
                    <CardJ>
                      <div style={{ width: "5%" }}> {item.merchandise.id}</div>
                      <div style={{ width: "20%" }}> {item.merchandise.name}</div>
                      <div style={{ width: "60%" }}> {item.merchandise.description}</div>
                      <div style={{ width: "10%" }}>$ {item.merchandise.price}x {item.quantity}</div>
                      <div style={{ width: "5%" }}>$ {item.total}</div>
                    </CardJ>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </section>
      )}
    </Fragment>
  );
}
//<p>{acc.cart.items[0].merchandise.name}</p>

export default Account;
//{user.name ? user.name : "You're not authenticated."}
/*
    <>
      <CardJ>
        <div>
          Account {user.name ? user.name : "You're not authenticated."}
        </div>
      </CardJ>
      <CardJ>
        <section className={classes.profile}>
          <section>
            <div><p>UID:</p><p>{acc.uid}</p></div>
            <div><p>Cart UID:</p><p>{acc.cartuid}</p></div>
          </section>
          <section>
            <div><p>Name:</p><p>{acc.name}</p></div>
            <div><p>Username:</p><p>{acc.username}</p></div>
          </section>
          <section>
            <div><p>Total Items:</p><p>{cart.totalItems}</p></div>
            <div><p>Total Amount:</p><p>${cart.totalAmount}</p></div>
          </section>
        </section>
      </CardJ>
      <section className={classes.cart}>
        <ul>
          <div className={classes.cartitem}>
            {cartitems.map((item) => (
              <li className={classes.listitem} key={item.merchandise.id}>
                <div>
                  <CardJ>
                    <div style={{ width: "5%" }}> {item.merchandise.id}</div>
                    <div style={{ width: "20%" }}> {item.merchandise.name}</div>
                    <div style={{ width: "60%" }}> {item.merchandise.description}</div>
                    <div style={{ width: "10%" }}>$ {item.merchandise.price}x {item.quantity}</div>
                    <div style={{ width: "5%" }}>$ {item.total}</div>
                  </CardJ>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </section>
    </>
*/