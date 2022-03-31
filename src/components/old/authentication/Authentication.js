import { Switch, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function Authentication() {
  return (
    <Layout>
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/testauth' element={<AuthPage />}/>
        <Route path='/profiletest' element={<UserProfile/>}/>
      </Routes>
    </Layout>
  );
}

export default Authentication;
