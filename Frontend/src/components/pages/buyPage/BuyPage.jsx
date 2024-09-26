import React, { useContext, useEffect, useState } from 'react'
import { AuthUserState } from '../../../context/authUserContext';
import styles from './BuyPage.module.css';
import { Link } from 'react-router-dom';
import { buyNowStripe, setCartItem } from '../../../base/api';
import Loader from '../../loader/Loader';

const BuyPage = () => {
    const {state} = useContext(AuthUserState);
    const [refresh, setRefresh] = useState(false);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    let summaryProduct = JSON.parse(localStorage.getItem('summaryProduct'));

    useEffect(()=>{
      summaryProduct = JSON.parse(localStorage.getItem('summaryProduct'));
      setRefresh(false);
    }, [refresh]);


    const minmax = (value, min, max) => Math.max(min, Math.min(value, max));


    const updateQuantity = async (prev, availableQuantity, change) => {
      const quantity = minmax(prev + change, 1, availableQuantity);
      summaryProduct.quantity = quantity;
      localStorage.setItem('summaryProduct', JSON.stringify(summaryProduct));
      setRefresh(true);
    };

    const checkout = async () =>{
      setIsPaymentLoading(true);
      const products = [summaryProduct]
      const newCartItem = {
        product: summaryProduct._id,
        quantity: summaryProduct.quantity
      }
      await setCartItem(newCartItem);
      try{
        await buyNowStripe(products, state.userEmail);
      }
      finally{
        setIsPaymentLoading(false);
      }
    }
    
  return (
    <>
    {isPaymentLoading && <Loader/>}
    <div className={`paddingSide ${styles.buyPage}`}>
      <div className={styles.deliveryAddContainer}>
        <h3 className={styles.deliverHeading}>Deliver to:</h3>
        <h3 className={styles.userName}>{state?.userName}</h3>
        {!state?.userAddress.street ? 
            <Link to='/myProfile'> <h3 className={styles.updateAddHeading}>Update profile</h3> </Link> :
            <p className={styles.deliveryAdd}>{state?.userAddress.street}, {state?.userAddress.city}, {state?.userAddress.postalCode}</p>
        }
      </div>
      {summaryProduct && 
      <div className={styles.productContainer}>
        <div className={styles.cartItem}>
            <div className={styles.cartItemImageContainer}>
              <img
                src={`http://localhost:3000/api/product/getImage/${summaryProduct.images[summaryProduct.images.length - 1]}`}
                alt=""
                className={styles.cartItemImage}
              />
            </div>
            <div className={styles.cartItemDetail}>
              <p className={styles.cartItemTitle}>
               {summaryProduct.name}
              </p>
              <div className={styles.quantityButtons}>
                <button className={styles.quantityButton} onClick={()=> updateQuantity(summaryProduct.quantity, summaryProduct.stock, -1)}>-</button>
                <span className={styles.quantity}>{summaryProduct.quantity}</span>
                <button className={styles.quantityButton} onClick={()=> updateQuantity(summaryProduct.quantity, summaryProduct.stock, 1)}>+</button>
              </div>
              <h3 className={styles.cartItemPrice}>₹{summaryProduct.offerPrice*summaryProduct.quantity.toLocaleString()}</h3>
            </div>
        </div>
        <div className={styles.checkoutDiv}>
          <div className={styles.subTotalDiv}>
            <h3 className={styles.totalHeading}>Sub Total:</h3> <span className={styles.price}>₹{summaryProduct.offerPrice*summaryProduct.quantity.toLocaleString()}</span>
            <h3 className={styles.totalHeading}>Shipping:</h3> <span className={styles.price}>₹0.00</span>
            <h3 className={styles.totalHeading}>Total:</h3> <span className={styles.price}>₹{summaryProduct.offerPrice*summaryProduct.quantity.toLocaleString()}</span>
          </div>
          <button className={styles.checkOutButton} onClick={checkout}>Check out</button>
        </div>
      </div>
      }
    
      
    </div>
    </>
  )
}

export default BuyPage
