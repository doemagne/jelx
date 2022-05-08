import './App.css';
import Navigation from './components/UI/Navigation/Navigation';
import Account from './pages/Account';
import Home from './pages/Home';
import SignInN from './pages/SignInN';
import SignUpN from './pages/SignUpN';
import SignOut from './pages/SignOut';
import BackdropJ from './components/UI/Modal/Modal';
import Config from './pages/Config';
import MerchandiseR from './pages/MerchandiseR';
import MerchandiseConfig from './pages/admin/MerchandiseConfig';
import { Fragment, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { fetchTransportData } from './store/redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState, signout } from './store/redux/slice/AuthSlice';
import Notification from "./components/js/UI/Notification/Notification";
import MerchandiseDetail from './components/js/MerchandiseR/MerchandiseDetail';
import NotFound from './pages/NotFound';
import RegisterNewMerchandise from './pages/admin/RegisterNewMerchandise';
import RegisterExistingMerchandise from './pages/admin/RegisterExistingMerchandise';
function App() {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.ui.loadstate);
  const notification = useSelector(state => state.ui.notification);
  const authenticated = useSelector(state => state.user.authenticated)
  const name = useSelector(state => state.user.name);
  const cartuid = useSelector(state => state.user.cartuid);
  //const token = useSelector(state => state.user.token);
  let token = window.sessionStorage.getItem("token")
  const fetchUserHandler = useCallback(async () => {
    dispatch(fetchTransportData(token));
  }, [])
  useEffect(() => {
    fetchUserHandler();
    if (!authenticated) {
      dispatch(signout());
    }
  }, [fetchUserHandler]);//WORKS -> RUNS ONCE
  // }, []);//ALSO WORKS -> RUNS ONCE//KEEP
  return (
    <Fragment>
      {loader && <BackdropJ />}
      <div className="App">
        <BrowserRouter>
          <Navigation name={name} authenticated={authenticated} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account/signinN" element={<SignInN />} />
              <Route path="/account/signupN" element={<SignUpN />} />
              <Route path="/account/user" element={<Account authenticated={authenticated} />} />
              <Route path="/account/signout" element={<SignOut />} />
              <Route path="/merchandise/register/*" element={<MerchandiseConfig authenticated={authenticated} />} />
              <Route path="/merchandise/new" element={<RegisterNewMerchandise authenticated={authenticated} />} />
              <Route path="/merchandise/existing" element={<RegisterExistingMerchandise authenticated={authenticated}/>}/>
              <Route path="/merchandise/cartr" element={<MerchandiseR cartuid={cartuid} authenticated={authenticated} />} />
              <Route path="/merchandise/detail/:idkey/*" element={<MerchandiseDetail/>}/>
              <Route path="/config" element={<Config />} />
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    </Fragment>
  );
}

  //<Route path={`/merchandise/detail/:idkey/comments`} element={<Comments/>} />
export default App;
/*
              <Route path={`/merchandise/detail/${params.idkey}/comments`} element={<Comments/>} />
//import aes from 'crypto-js/aes';
//import rabbit from 'crypto-js/rabbit';
//import { enc } from 'crypto-js/core';

    //if (token == null || token.length == 0) {
      //token = aes.encrypt("empty", secret).toString(enc.Hex);
    //}
    //token = aes.decrypt(token,secret)
//let secret = 'abc';
//OLD
//import Notification from "./components/js/UI/Notification/Notification";
//import RegisterMerchandise from './pages/admin/RegisterMerchandise';
//import StockJ from './pages/StockJ';
//import ExpenseJournal from './pages/ExpenseJournal';
//import ReduxStarter from './components/old/reduxer/starter/ReduxStarter';
//import Warehouse from './components/old/whcomponents/Warehouse';
//import Offline from './components/js/offline/Offline';
              <Route path="/merchandise/cart" element={<StockJ />} />
              <Route path="/expensesjournal" element={<ExpenseJournal />} />
              <Route path="/redux/starter" element={<ReduxStarter />} />
              <Route path="/ware/house" element={<Warehouse />} />
              <Route path="/index/offline" element={<Offline />} />
*/
//KEEP ORIGINALS
          //<Route path="/account/signin" element={<SignIn setName={setName} setUid={setUid} setCartuid={setCartuid} email={''} password={''} />} />
          //<Route path="/account/signup" element={<SignUp name={''} email={''} password={''} />} />
/*try {
  //console.log(`Getting user session:`);
  //const response = await fetch("http://pecan.local:2023/api/user", {
  const response = await fetch(ServerURL + '/api/user', {
    headers: { "Content-Type": "application/json", },
    credentials: "include",
    //mode:"no-cors",
  });
  const content = await response.json();
  transport = content;
  //console.log(transport);
  setName(content.name);
  namec = content.name;
  //setCartuid(content.cartuid);cartuidc = content.cartuid;setUid(content.uid);uidc = content.uid;setAmount(content.cart.totalAmount);amountc = content.cart.totalAmount;setQuantity(content.cart.totalItems);quantityc = content.cart.totalItems;/
  if (content.name.length > 0 && content.name && content.name.trim() !== '') {
    //setAuthenticated(true);
    console.log(`SideEffect has detected a session with ${namec}`);
    setCartuid(content.cartuid)
    setUid(content.uid)
    dispatch(setAuthState({
      username: transport.username,
      uid: transport.uid,
      cartuid: transport.cartuid,
    }))
    dispatch(setguid(transport.cart))
    console.log("sendCartData was called.");
    //setAuthenticated(accuser.athenticated);
  }
} catch (e) {
  //setAuthenticated(false);
  setName('');
  /if (e instanceof Error) {
    setError({
      title: "An error occured.",
      content: `The system encountered an unexpected error:\n ${e} \n Please try again later.`,
    });
    console.log(error);
  }/
}*/