import { ServerURL } from "../constraint/ServerURL";
import Card from "../components/UI/Card/Card";
import { useRef } from "react";

const SignUpN = (props) => {

  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();

  const submitHandler = async(e) => {
    e.preventDefault();
    const credentials = {
      name: nameref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value,
    }
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
    console.log(response);

  }

  return (
    <main className="form-signin">
      <Card className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <form onSubmit={submitHandler} >
          <div className={`form-floating form-fl`}>
            <input ref={nameref} className="form-control" id="name" placeholder="Name" type="text" required/>
            <label htmlFor="name">Name</label>
          </div>
          <div className={`form-floating form-fl`}>
            <input ref={emailref} className="form-control" id="email" placeholder="Email" type="email" required/>
            <label htmlFor="email">Email</label>
          </div>
          <div className={`form-floating form-fl`}>
            <input ref={passwordref} className="form-control" id="password" placeholder="Password" type="password" required/>
            <label htmlFor="password">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
      </Card>
    </main>
  )
}

export default SignUpN;
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