import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/UI/Navigation/Navigation';
import Account from './pages/Account';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import MerchandiseR from './pages/MerchandiseR';
import { ServerURL } from './constraint/ServerURL';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticationState, signout } from './store/redux/slice/UserSlice';
import { setguid } from './store/redux/slice/CartSlice';
let namec = '';
//let uidc = '';//let cartuidc = '';//let amountc = '';//let quantityc = 0;
let transport = {};
function App() {
  const dispatch = useDispatch();
  const accuser = useSelector(state => state.user);
  const [name, setName] = useState(namec);
  const [cartuid, setCartuid] = useState('');
  //const [amount, setAmount] = useState(0);//const [quantity, setQuantity] = useState(0);
  const [uid, setUid] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState({
    title: '',
    content: '',
  });

  const fetchUserHandler = useCallback(async () => {
    try {
      console.log(`Getting user session:`);
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
      /*setCartuid(content.cartuid);cartuidc = content.cartuid;setUid(content.uid);uidc = content.uid;setAmount(content.cart.totalAmount);amountc = content.cart.totalAmount;setQuantity(content.cart.totalItems);quantityc = content.cart.totalItems;*/
      if (content.name.length > 0 && content.name && content.name.trim() !== '') {
        //setAuthenticated(true);
        console.log(`SideEffect has detected a session with ${namec}`);
        setCartuid(content.cartuid)
        setUid(content.uid)

        console.log('STATE');
        dispatch(setAuthenticationState(content/*{
          username: transport.username,
          uid: transport.uid,
          cartuid: transport.cartuid,
        }*/))
        dispatch(setguid(transport.cart))
        console.log("sendCartData was called.");
        setAuthenticated(accuser.athenticated);
      }
    } catch (e) {
      setAuthenticated(false);
      setName('');
      if (e instanceof Error) {
        setError({
          title: "An error occured.",
          content: `The system encountered an unexpected error:\n ${e} \n Please try again later.`,
        });
        //console.log(error);
      }
    }
  }, [])
  useEffect(() => {
    console.log('useEffect -> fetchUserHandler')
    fetchUserHandler();
    if (!authenticated) {
      dispatch(signout());
    }
  }, [fetchUserHandler]);//WORKS -> RUNS ONCE
  // }, []);//ALSO WORKS -> RUNS ONCE//KEEP

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation name={name} setName={setName} authenticated={authenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/signin" element={<SignIn email={'z@z.z'} password={'z'} />} />
          <Route path="/account/signup" element={<SignUp name={''} email={''} password={''} />} />
          <Route path="/account/user" element={<Account name={name} />} />
          <Route path="/account/signout" element={<SignOut />} />
          <Route path="/merchandise/cartr" element={<MerchandiseR cartuid={cartuid} authenticated={authenticated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*import Config from './pages/Config';
import StockJ from './pages/StockJ';
import MerchandiseRegisterJ from './components/js/Merchandise/Register/MerchandiseRegisterJ';
import ExpenseJournal from './pages/ExpenseJournal';
import ReduxStarter from './components/old/reduxer/starter/ReduxStarter';
import Warehouse from './components/old/whcomponents/Warehouse';
import Offline from './components/js/offline/Offline';

          <Route path="/config" element={<Config />} />
          <Route path="/merchandise/cart" element={<StockJ />} />
          <Route path="/merchandise/register" element={<MerchandiseRegisterJ />} />
          <Route path="/expensesjournal" element={<ExpenseJournal />} />
          <Route path="/redux/starter" element={<ReduxStarter />} />
          <Route path="/ware/house" element={<Warehouse />} />
          <Route path="/index/offline" element={<Offline/>}/>
*/