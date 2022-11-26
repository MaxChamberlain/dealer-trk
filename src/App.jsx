import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import MyAccount from "./pages/Account/MyAccount/MyAccount";
import Documents from "./pages/Documents/Documents";
import Summary from "./pages/Summary/Summary";
import PickSummaryType from "./pages/Summary/:id/PickSummaryType";
import Overview from "./pages/Summary/:id/overview/Overview";
import Protected from "./components/Protected";
import UnprotectedStrict from "./components/UnprotectedStrict";
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CircularProgress } from '@mui/material'
import { UserContext } from './contexts/UserContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useContext(UserContext);

  if(user?.loading){
    return(
      <div className='w-screen h-screen flex items-center justify-center'>
        <CircularProgress />
      </div>
    )
  }
  return (
    <div className="w-screen bg-stone-100" style={{
      minHeight: 'calc(100vh - 48px)',
      marginTop: 48
    }}>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location} navigate={navigate}>
          <Route path="/login" element={<UnprotectedStrict redirect={<Login />} />} />
          <Route path="/register" element={<UnprotectedStrict redirect={<Register />} />} />
          <Route path="/home" element={<Protected redirect={<Home />} />} />
          <Route path="/myaccount" element={<Protected redirect={<MyAccount />} />} />
          <Route path="/documents" element={<Protected redirect={<Documents />} />} />
          <Route path="/summary" element={<Protected redirect={<Summary />} />} />
          <Route path="/summary/:id" element={<Protected redirect={<PickSummaryType />} />} />
          <Route path="/summary/:id/overview" element={<Protected redirect={<Overview />} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
