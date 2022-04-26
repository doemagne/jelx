import './SignIn.module.css'
import Card from "../components/UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef, useState } from "react";
import { authenticateUser } from "../store/redux/action/userAction";
import { Navigate } from "react-router-dom";

const SignInN = (props) => {
  const [pV, setPV] = useState(false);
  const [passwordText, setPasswordText] = useState('password')
  const authenticated = useSelector(state => state.user.authenticated);
  const [eye,setEye] = useState('eye')

  const dispatch = useDispatch();
  const usernameref = useRef();
  const passwordref = useRef();

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
      //email: emailref.current.value,
      username: usernameref.current.value,
      password: passwordref.current.value,
    }
    dispatch(authenticateUser(credentials));
  }
  if (authenticated) {
    return <Navigate to="/account/user" />
  }
  //{notification && notification.status == 'success' && <Navigate to='/account/user'/>}
  return (
    <Fragment>
      <main className="form-signin">
        <Card className="form-signin">
          <h1 className="h3 mb-3 fw-normal">Sign In</h1>
          <form onSubmit={submitHandler}>
            <div className='input-group mb-2'>
              <div className='input-group-prepend'></div>
              <div className='input-group-text'>
                <span className='bi bi-person' />
              </div>
              <input ref={usernameref} className='form-control' type='text' id='username' placeholder='Username' required />
            </div>
            <div className='input-group mb-2'>
              <div className='input-group-prepend'></div>
              <div className='input-group-text'>
                <span className='bi bi-key' />
              </div>
              <input ref={passwordref} className='form-control' type={passwordText} id='password' placeholder='Pasword' required/>
              <button type='button' className='input-group-text' onClick={togglePasswordVisibility}>
                <span className={`bi bi-${eye}`} />
              </button>
            </div>
            <button className="w-100 btn btn-lg btn-secondary" type="submit">
              <span className="bi bi-door-open" />
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
          </form>
        </Card>
      </main>
    </Fragment>
  )
}

export default SignInN;
/*
            <div className={`form-floating form-fl`}>
              <input ref={emailref} className="form-control" id="email" placeholder="Email" type="email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className={`form-floating form-fl`}>
              <input ref={passwordref} className="form-control" id="password" placeholder="Password" type="password" required />
              <label htmlFor="password">Password</label>
            </div>
import React, { useState } from "react";
import { Navigate } from 'react-router';
import InputRequired from "../components/UI/Form/InputRequired";
import Modal from "../components/UI/Modal/Modal";
import { ServerURL } from "../constraint/ServerURL";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [valid, setValid] = useState(true);

          <div className={`form-floating form-fl`}>
            <input className="form-control" id="name" placeholder="Name" type="text" />
            <label htmlFor="name">Name</label>
          </div>
    <main className="form-signin">
      <div>
      <Card className="form-signin">
        <form >
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <InputRequired 
        inputtype={'email'}
        setTxt={setEmail} 
        val={email} 
        txt={'Email'}
        setValid={setValid}
        valid={valid}
        />
        <InputRequired 
        inputtype={'password'}
        setTxt={setPassword} 
        val={password} 
        txt={'Password'}
        setValid={setValid}
        valid={valid}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </Card>
    </div>
    </main>
      {error.content && <Modal title={error.title} content={error.content} onConfirm={errorHandler}/>}

import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from '../store/redux/slice/AuthSlice';
import { setguid } from "../store/redux/slice/CartSlice";
import { setTransport } from "../store/redux/slice/UserSlice";
  const [error, setError] = useState({
    title: '',
    content: '',
  });

  const dispatch = useDispatch();

  const submit = async (e) => {
    try {
      e.preventDefault();
      //await fetch("http://localhost:2020/api/login", {
      //const response = await fetch("http://pecan.local:2023/api/signin", {
      const response = await fetch(ServerURL+'/api/signin', {
        //const response = await fetch("http://pecan.local:2019/api/clients/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Access-Control-Allow-Origin":"*"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password
        })
      });
      const content = await response.json();
      console.log(content);
      setRedirect(true);
      props.setName(content.name);
      props.setCartuid(content.cartuid)
      props.setUid(content.uid)
      dispatch(setAuthState({
        username:content.name,
        uid: content.uid,
        cartuid: content.cartuid,
      }));
      dispatch(setguid(content.cart));
      dispatch(setTransport({id:1,content}));
    } catch (e) {
      let result;// = (e as Error).message;
      if (e instanceof Error) {
        result = e.message; // works, `e` narrowed to Error
        console.log(result);
        setError({
          title: "An error occured.",
          content: `The system encountered an unexpected error:\n ${e} \n Please try again later.`,
        });
      }
    }
  }
  const errorHandler = () => {
    setError({
      title: '',
      content: '',
    })
  };

  if (redirect) {
    return <Navigate to="/account/user" />
  }

*/