import React from 'react'
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={`${styles.loaderPage} `}>
        <div className={styles.loader}></div>
    </div>
  )
}

export default Loader
