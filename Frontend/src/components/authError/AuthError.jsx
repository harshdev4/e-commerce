import React, { useContext } from 'react'
import styles from './AuthError.module.css';
import { ErrorStateContext } from '../../context/errorState';

const AuthError = ({errorText}) => {

  const {setErrorState} = useContext(ErrorStateContext);

  return (
    <div className={styles.errorAlertContainer}>
      <div className={styles.errorAlert}>
        <h3 className={styles.errorText}>{errorText}</h3>
        <i className={` ${styles.cross} fa-solid fa-xmark`} onClick={()=>setErrorState(false)}></i>
      </div>
    </div>
  )
}

export default AuthError;
