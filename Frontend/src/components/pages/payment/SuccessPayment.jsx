import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Success.module.css';
import { useEffect } from 'react';
import { deleteCartItem } from '../../../base/api';
import Cookies from 'js-cookie';

const SuccessPayment = () => {
  let {productIds} = useParams();
  productIds = productIds.split(',');
  const navigate = useNavigate();

  useEffect(()=>{
    const cookieValue = Cookies.get('pS');
    if (!cookieValue) {
      navigate('/');
    }

    else{
      Cookies.remove('pS');
    }

    const removePurchased = async ()=>{
      await deleteCartItem(productIds);
    }
    removePurchased();
  }, []);

  return (
    <div className={styles.successPage}>
      <div className={styles.celebrationDiv}>
        <div className={styles.successImgContainer}>
          <img src="/images/success.png" alt="successImage" className={styles.successImg}/>
        </div>
        <p className={styles.thnkMsg}>Thank you for ordering!</p>
        <div className={styles.btnContainer}>
          <Link to='#' className={`removeLinkEffect ${styles.btn} ${styles.orderBtn}`}>View Order</Link>
          <Link to='/' className={`removeLinkEffect ${styles.btn} ${styles.continueBtn}`}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default SuccessPayment
