import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/UI/Navigation/Navigation';
import Account from './pages/Account';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import Config from './pages/Config';
import StockJ from './pages/StockJ';
import ServerURL from './constraint/ServerURL';
import MerchandiseRegisterJ from './components/js/Merchandise/Register/MerchandiseRegisterJ';
import ExpenseJournal from './pages/ExpenseJournal';
import ReduxStarter from './reduxer/starter/ReduxStarter';
import Warehouse from './whcomponents/Warehouse';
let namec = '';
function App() {
  const [name, setName] = useState(namec);
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
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        //mode:"no-cors",

      });
      const content = await response.json();
      setName(content.name);
      namec = content.name;
      if (content.name && content.name.trim() !== '') {
        setAuthenticated(true);
        console.log(`SideEffect has detected a session with ${namec}`);
      }
    } catch (e) {
      setAuthenticated(false);
      setName('');
      //let result = (e as Error).message;
      if (e instanceof Error) {
        //result = (e as Error).message; // works, `e` narrowed to Error
        setError({
          title: "An error occured.",
          content: `The system encountered an unexpected error:\n ${e} \n Please try again later.`,
        });
        console.log(error);
      }
    }
  }, [])
  useEffect(() => {
    console.log('useEffect -> fetchUserHandler')
    fetchUserHandler();
  }, [fetchUserHandler]);//WORKS -> RUNS ONCE
  // }, []);//ALSO WORKS -> RUNS ONCE//KEEP


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation name={name} setName={setName} authenticated={authenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/signin" element={<SignIn setName={setName} email={''} password={''} />} />
          <Route path="/account/signup" element={<SignUp name={''} email={''} password={''} />} />
          <Route path="/account/user" element={<Account name={name} />} />
          <Route path="/account/signout" element={<SignOut />} />
          <Route path="/config" element={<Config />} />
          <Route path="/account/stockj" element={<StockJ />} />
          <Route path="/merchandise/register" element={<MerchandiseRegisterJ />} />
          <Route path="/expensesjournal" element={<ExpenseJournal />} />
          <Route path="/redux/starter" element={<ReduxStarter />} />
          <Route path="/ware/house" element={<Warehouse />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
