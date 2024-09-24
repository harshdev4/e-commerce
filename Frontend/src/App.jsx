import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import { useContext, useEffect, useState } from 'react';
import { AuthUserState } from './context/authUserContext';
import { getUserData, isLoggedIn, refreshToken } from './base/api';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ConfirmPopUp from './components/confirmPop/ConfirmPopUp';
import { PopupState } from './context/popupContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const {state, dispatch} = useContext(AuthUserState);
  const popupContext = useContext(PopupState);
  const [tokenExp, setTokenExp] = useState(null);

  NProgress.configure({
    showSpinner: false, speed: 500, minimum: 0.2
  });

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = "MAYA"
    }
    NProgress.start();
    window.scrollTo(0, 0);
    NProgress.done();
    

  }, [location.pathname]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await isLoggedIn(state.userId, dispatch, setTokenExp);
    };
    
    const fetchUserData = async ()=>{
      try {
        await getUserData(state.userId, dispatch);
      } catch (error) {
        console.log(error);
      }
    }

    if (!state.userId) {
      checkLoggedIn();
    }

    if (state.userId) {
      fetchUserData();
    }

  }, [state.userId, state.updated]);

  useEffect(()=>{
    const checkLoggedIn = async () => {
      await isLoggedIn(state.userId, dispatch, setTokenExp);
    };

    if (tokenExp) {
      let currentTime = new Date();
      currentTime = currentTime.getTime();
      const timeToExpire = tokenExp - currentTime;
      
      const timeoutId = setTimeout(() => {
        checkLoggedIn();
      }, timeToExpire+850);

      return () => clearTimeout(timeoutId);
    }
  }, [tokenExp]);
  

  return (
    <>
      {location.pathname!=='/search' && <Header/>}
      {popupContext.popupState && <ConfirmPopUp setPopupState={popupContext.setPopupState} confirmMsg={popupContext.confirmMsg} buttonTitle={popupContext.buttonTitle} confirmAction={()=>popupContext.confirmAction()}/>}
      <Outlet></Outlet>
    </>
  )
}

export default App;
