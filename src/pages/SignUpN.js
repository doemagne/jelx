import Card from "../components/UI/Card/Card";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../store/redux/action/userAction";
import { enc } from "crypto-js/core";
import sha256 from "crypto-js/sha256";
import { Navigate } from "react-router-dom";


let initialload = true;

const SignUpN = (props) => {
  const [pV, setPV] = useState(false);
  const [passwordText, setPasswordText] = useState('password')
  const [eye,setEye] = useState('eye')
  const redirect = useSelector(state => state.ui.redirectstate);
  const dispatch = useDispatch();
  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const confirmpasswordref = useRef();

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const credentials = {
      name: nameref.current.value,
      username: nameref.current.value,
      email: emailref.current.value,
      password: sha256(passwordref.current.value).toString(enc.Hex),
      confirmpassword: sha256(confirmpasswordref.current.value).toString(enc.Hex),
    }
    console.log('registring user')
    dispatch(registerUser(credentials));
    initialload = false;
  }

  if (redirect) {
    return <Navigate to="/account/signinN" />
  }

  return (
    <main className="form-signin">
      <Card className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
        <form onSubmit={submitHandler} >
          <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
              <span className='bi bi-person' />
            </div>
            <input ref={nameref} className='form-control' type='text' id='name' placeholder='Name' required />
          </div>
          <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
              <span className='bi bi-at' />
            </div>
            <input ref={emailref} className='form-control' type='email' id='email' placeholder='Email' required />
          </div>
          <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
              <span className='bi bi-key' />
            </div>
            <input ref={passwordref} className='form-control' type={passwordText} id='password' placeholder='Pasword' required />
            <button type='button' className='input-group-text' onClick={togglePasswordVisibility}>
              <span className={`bi bi-${eye}`} />
            </button>
          </div>
          <div className='input-group mb-2'>
            <div className='input-group-prepend'></div>
            <div className='input-group-text'>
              <span className='bi bi-key-fill' />
            </div>
            <input ref={confirmpasswordref} className='form-control' type={passwordText} id='confirmpassword' placeholder='Confirm Pasword' required />
          </div>
          <button className="w-100 btn btn-lg btn-secondary" type="submit">
            <span className="bi bi-person-lines-fill" />
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
      </Card>
    </main>
  )
}

export default SignUpN;
  /*

        <div className={`form-floating form-fl`}>
          <input ref={nameref} className="form-control" id="name" placeholder="Name" type="text" required />
          <label htmlFor="name">Name</label>
        </div>
        <div className={`form-floating form-fl`}>
          <input ref={emailref} className="form-control" id="email" placeholder="Email" type="email" required />
          <label htmlFor="email">Email</label>
        </div>
        <div className={`form-floating form-fl`}>
          <input ref={passwordref} className="form-control" id="password" placeholder="Password" type="password" required />
          <label htmlFor="password">Password</label>
        </div>
const stimulus = await fetch(ServerURL+'/api/signup', {
method: "POST",
headers: {"Content-Type": "application/json",},
credentials: "include",
body: JSON.stringify(credentials),
});
if (!stimulus.ok) {
throw new Error('an error occured when the sending request.')
}
const response = await stimulus.json();
console.log(response);*/

/*
//import { Navigate } from "react-router";
import React, { useState } from "react";
import Button from "../components/UI/Button/Button";
import InputRequired from "../components/UI/Form/InputRequired";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  let [valid, setValid] = useState(true);
  const [name, setName] = useState("");
        <InputRequired
        inputtype={'text'}
        val={name} 
        txt={'Name'} 
        valid={valid} 
        setValid={setValid}
        setTxt={setName} 
        />
        <InputRequired 
        inputtype={'email'}
        val={email} 
        txt={'Email'} 
        valid={valid} 
        setValid={setValid}
        setTxt={setEmail} 
        />
        <InputRequired 
        inputtype={'password'}
        val={password} 
        txt={'Password'} 
        valid={valid} 
        setValid={setValid}
        setTxt={setPassword} 
        />


  const submit = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      valid = false;
      setValid(valid);
      console.log(valid);
      return;
    } else {
      valid = true;
      setValid(valid);
      console.log(valid);
    }
    setName(name);
    setValid(valid);

    console.log("submitting.");
    const response = await fetch(ServerURL+'/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*"
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
    const content = await response.json();
    console.log(content);
    setRedirect(true);
  }
  if (redirect) {
    console.log("redirecting");
    return <Navigate to="/account/signin" />
  }

*/