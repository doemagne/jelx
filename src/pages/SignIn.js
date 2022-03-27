import React, { useState } from "react";
import { Navigate } from 'react-router';
import Card from "../components/UI/Card/Card";
import InputRequired from "../components/UI/Form/InputRequired";
import Modal from "../components/UI/Modal/Modal";
import { ServerURL } from "../constraint/ServerURL";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from '../store/redux/slice/AuthSlice';




const SignIn = (props) => {
  const [error, setError] = useState({
    title: '',
    content: '',
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [valid, setValid] = useState(true);
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

  return (
    <main className="form-signin">
      <div>
      {error.content && <Modal title={error.title} content={error.content} onConfirm={errorHandler}/>}
      <Card className="form-signin">
        <form onSubmit={submit}>
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
  )
}

export default SignIn;

/*      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
      */