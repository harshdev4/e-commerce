import React, { useContext, useEffect, useState } from 'react'
import styles from './ForgotPass.module.css';
import { ErrorStateContext } from '../../context/errorState';
import { forgotPass } from '../../base/api';
import NotifyPopup from '../notifyPop/NotifyPopup';
import Loader from '../loader/Loader';

const ForgotPass = () => {
  const {errorState, setErrorState} = useContext(ErrorStateContext);
  
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState({
    mobileNo: ''
  });

  const [notifyText, setNotifyText] = useState('');
  const [color, setColor] = useState('');

  const handleInput = (e)=>{
    const newValue = e.target.value;
    const numericValue = newValue.replace(/[^0-9]/g, '');
    setInput(prevData => ({
        ...prevData,
        mobileNo: numericValue.slice(0, 10)
      }));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    await forgotPass(input, setErrorState, setNotifyText, setColor);
    setIsLoading(false);
  }

  useEffect(()=>{
    setErrorState(false);
  },[]);

  return (<>
    {isLoading && <Loader/> }
    <div className={`paddingSide ${styles.forgotPassPage}`}>
      {errorState && !isLoading &&<NotifyPopup notifyText={notifyText} color={color}></NotifyPopup>}
      <h1 className={`heading ${styles.forgotHeading}`}>Forgot Password</h1>
      <form onSubmit={handleSubmit} className={styles.forgotForm}>
        <fieldset className={styles.fieldset}>
          <legend>Phone Number</legend>
          <input type="text" placeholder='Enter your registered mobile number' value={input.mobileNo} className={styles.forgotInput} accept='number' autoFocus onChange={handleInput}/>
        </fieldset>
        <input type="submit" value="Reset Password" className={styles.submit}/>
      </form>
    </div></>
  )
}

export default ForgotPass
