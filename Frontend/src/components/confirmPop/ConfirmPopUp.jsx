import React, { useEffect } from 'react'
import styles from './ConfirmPopUp.module.css'

const ConfirmPopUp = ({setPopupState, confirmMsg, buttonTitle, confirmAction}) => {
    
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
    },[]);

    const handleAction = async ()=>{
        document.body.style.overflow = 'auto';
        await confirmAction();
        setPopupState(false); 
    }

  return (
    <div className={styles.confirmPopUpPage}>
        <div className={styles.backPage} onClick={()=> { document.body.style.overflow = 'auto'; setPopupState(false) }}></div>
        <div className={styles.popup}>
            <div className={styles.confirmMsgContainer}><p className={styles.confirmMsg}>{confirmMsg}</p></div>
            <div className={styles.btnContainer}>
                <button className={styles.cancelBtn} onClick={()=> {document.body.style.overflow = 'auto'; setPopupState(false)}}>Cancel</button>
                <button className={styles.actionBtn} onClick={handleAction}>{buttonTitle}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmPopUp;
