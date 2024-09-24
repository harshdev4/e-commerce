import React, { useContext, useEffect, useState } from 'react'
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { inputContext } from '../../../context/authInputContext';
import { handleInputChange } from '../inputUtils';
import AuthError from '../../authError/AuthError';
import { registerUser } from '../../../base/api';
import { ErrorStateContext } from '../../../context/errorState';
import { AuthUserState } from '../../../context/authUserContext';

const Register = () => {
  const navigate = useNavigate();
  const {passwordEye, inputPassword, toggleEye} = useContext(inputContext);
  const {errorState, setErrorState} = useContext(ErrorStateContext);
  const {state, dispatch} = useContext(AuthUserState);

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');


  useEffect(()=>{
    document.title = "Sign-up - MAYA"
    if (state.userName) {
      navigate('/');
    }
    setErrorState(false);
  },[state.userName])


  const handleSubmit = (e)=>{
    e.preventDefault();
    registerUser(registerData, setErrorState, setErrorMsg, dispatch, navigate);
  }

  return (
    <div className={`${styles.registerPage}`} >
      { errorState && <AuthError errorText={errorMsg}/> }
        <div className={styles.registerContainer}>
        <div className={styles.coloredHalf}>
            <h2 className={styles.registerHeading}>Register</h2>
            <p className={styles.registerPara}>Get access to the best furniture for your spaces. </p>
        </div>
        <div className={styles.inputHalf}>
            <form className={styles.authForm} method="post" onSubmit={handleSubmit}>
                <input type="text" name="name" value={registerData.name} className={styles.authInputField} placeholder="Full Name" pattern="^\S(.*\S)?$" required autoFocus onChange={(e)=> handleInputChange(e, setRegisterData)}/>
                <input type="text" name="email" value={registerData.email.trim()} className={styles.authInputField} placeholder="Email Address" required onChange={(e)=> handleInputChange(e, setRegisterData)}/>
                <input type="text" name="mobileNo" value={registerData.mobileNo} className={styles.authInputField} placeholder="Mobile Number" required accept='number' onChange={(e)=> handleInputChange(e, setRegisterData)}/>
                <div className={styles.passwordField}>
                  <i className={` ${styles.eyeSlash} fa-regular fa-eye-slash`} ref={passwordEye} onClick={toggleEye}></i>
                  <input type="password" name="password" value={registerData.password.trim()} className={styles.authInputField} placeholder="Password" required ref={inputPassword} onChange={(e)=> handleInputChange(e, setRegisterData)}/>
                </div>
                <input type="submit" value="Create Account" className={styles.authSubmitBtn}/>
            </form>

            <div className={styles.newUser}>
              <h3 className={styles.askingHeading}>Already have an account?</h3>
              <Link to='/login' className={`removeLinkEffect ${styles.createAccountLink}`}>Login to an account</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
