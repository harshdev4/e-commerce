import React, { useContext } from 'react'
import styles from './NotifyPopup.module.css';
import { ErrorStateContext } from '../../context/errorState';

const NotifyPopup = ({notifyText, color}) => {

  const {setErrorState} = useContext(ErrorStateContext);

  return (
    <div className={styles.errorAlertContainer}>
      <div className={styles.notifyAlert} style={{backgroundColor: `${color}`}}>
        <h3 className={styles.notifyText}>{notifyText}</h3>
        <i className={` ${styles.cross} fa-solid fa-xmark`} onClick={()=>setErrorState(false)}></i>
      </div>
    </div> 
  )
}

export default NotifyPopup;
