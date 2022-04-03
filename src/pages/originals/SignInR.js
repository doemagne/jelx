import Card from "../../components/UI/Card/Card";
import InputRequired from "../../components/UI/Form/InputRequired";
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from "../../store/redux/action/userAction";
import { Fragment, useEffect, useState } from "react";
import { Navigate } from 'react-router';
import Notification from "../components/js/UI/Notification";

let authentic = false;
const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const redirector = useSelector(state => state.user.authenticated)
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();
  const submit = async (e) => {
    e.preventDefault();
    const credentials = { email, password, }
    dispatch(authenticateUser(credentials));
    authentic = redirector.authenticated;
    console.log(authentic);
  }

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <main className="form-signin">
        <div>
          <Card className="form-signin">
            <form onSubmit={submit}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <InputRequired inputtype={'email'} setTxt={setEmail} val={email} txt={'Email'} setValid={setValid} valid={valid} />
              <InputRequired inputtype={'password'} setTxt={setPassword} val={password} txt={'Password'} setValid={setValid} valid={valid} />
              <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
            </form>
          </Card>
        </div>
      </main>
      {redirector && notification && notification.status=='success' && <Navigate to="/account/user" />}
    </Fragment>
  )
}

export default SignIn;
//import Modal from "../components/UI/Modal/Modal";
//import { setAuthState } from '../store/redux/slice/AuthSlice';
//import { setguid } from "../store/redux/slice/CartSlice";
//import { setTransport } from "../store/redux/slice/UserSlice";
//import { ServerURL } from "../constraint/ServerURL";
        //{error.content && <Modal title={error.title} content={error.content} onConfirm={errorHandler} />}
/*const [error, setError] = useState({
  title: '',
  content: '',
});*/
///above redirect
/*  const submit = async (e) => {
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
*/