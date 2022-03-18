import React, { useState } from "react";
import { Navigate } from "react-router";
import Button from "../components/UI/Button/Button";
import Card from "../components/UI/Card/Card";
import InputRequired from "../components/UI/Form/InputRequired";
import ServerURL from "../constraint/ServerURL";
const SignUp = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  let [valid, setValid] = useState(true);

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

  return (
    <main className="form-signin">
      <Card className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <form onSubmit={submit}>
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
        <Button className="w-100 btn btn-lg btn-primary" type="submit">Submit</Button>
        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </Card>
    </main>
  )
}

export default SignUp;