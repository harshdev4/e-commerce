import { useContext, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import AuthError from '../../authError/AuthError';
import { inputContext } from '../../../context/authInputContext';
import { handleInputChange } from '../inputUtils';
import { loginUser } from '../../../base/api';
import { ErrorStateContext } from '../../../context/errorState';
import { AuthUserState } from '../../../context/authUserContext';

const Login = () => {
  const navigate = useNavigate();
  const {passwordEye, inputPassword, toggleEye} = useContext(inputContext);
  const [loginData, setLoginData] = useState({
    mobileNo: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const {errorState, setErrorState} = useContext(ErrorStateContext);

  const {state, dispatch} = useContext(AuthUserState);

  useEffect(()=>{
    document.title = "Login - MAYA";
    if (state.userName) {
      navigate('/');
    }
    setErrorState(false);
  },[state.userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(loginData, setErrorState, setErrorMsg, dispatch, navigate);
  }

  return (
    <div className={styles.loginPage}>
      { errorState && <AuthError errorText={errorMsg}/> }
      <div className={styles.loginContainer}>
        <div className={styles.coloredHalf}>
            <h2 className={styles.loginHeading}>Login {state.userName}</h2>
            <p className={styles.loginPara}>Get access to the best furniture for your spaces. </p>
        </div>
        <div className={styles.inputHalf}>
          <div>
            <form method="post" className={styles.authForm} onSubmit={handleSubmit}>
              <input type="text" name="mobileNo" className={styles.authInputField} placeholder="Mobile Number" autoFocus required accept='number' value={loginData.mobileNo} onChange={(e)=> handleInputChange(e, setLoginData)}/>
              <div className={styles.passwordField}>
                <i className={` ${styles.eyeSlash} fa-regular fa-eye-slash`} ref={passwordEye} onClick={toggleEye}></i>
                <input type="password" name="password" value={loginData.password} className={styles.authInputField} placeholder="Password" required ref={inputPassword} onChange={(e)=> handleInputChange(e, setLoginData)}/>
              </div>
              <input type="submit" value="Login" className={styles.authSubmitBtn}/>
            </form>
            <Link to='/forgot-password' className={`${styles.forgotPassword} removeLinkEffect`}>Forgot Password?</Link>
          </div>

            <div className={styles.newUser}>
              <h3 className={styles.askingHeading}>Don't have an account?</h3>
              <Link to='/signUp' className={`removeLinkEffect ${styles.createAccountLink}`}>Create an account</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
