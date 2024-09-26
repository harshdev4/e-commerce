import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import { buyNowStripe, deleteCartItem, getCartItem, setCartItem } from "../../base/api";
import { AuthUserState } from "../../context/authUserContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const {state} = useContext(AuthUserState);
  const navigate = useNavigate();

  let cartItems = JSON.parse(localStorage.getItem('mayaCart')) || [];

  useEffect(()=>{
    document.title = "Cart - MAYA";
    setLoading(true);

    if (cartItems.length > 0 || state.login) {
      const getCartItemFn = async () =>{
        await getCartItem(cartItems, setCartProducts, state.login);
      }
      getCartItemFn();
    }
    else{
      setCartProducts([]);
    }
    setLoading(false);
    setRefresh(false);
  }, [refresh, state.login]);

  useEffect(()=>{
    let calculatedTotal = cartProducts.reduce((acc, item) => acc + item.product.offerPrice*item.quantity, 0);
        setTotal(calculatedTotal);
  }, [cartProducts]);


  const deleteItem = async (productId)=>{
      let cartItems = JSON.parse(localStorage.getItem('mayaCart'));
      cartItems = cartItems.filter((item)=> item.product !== productId);
      localStorage.setItem('mayaCart', JSON.stringify(cartItems));
      
      if (state.login) {
        await deleteCartItem(productId);
      }
      setRefresh(true);
  }

  const minmax = (value, min, max) => Math.max(min, Math.min(value, max));


  const updateQuantity = async (productId, prev, availableQuantity, change) => {
    const quantity = minmax(prev + change, 1, availableQuantity);

    const newCartItem = {
        product: productId,
        quantity: quantity
    }

    if (prev != quantity) {
        if (!state.login) {
            cartItems.map(item => item.product == productId ? item.quantity = quantity : item.quantity);
            localStorage.setItem('mayaCart', JSON.stringify(cartItems));
        }
        else{
            await setCartItem(newCartItem);
        }    
    }
    setRefresh(true);
  };

  const checkout = async () =>{
    setIsPaymentLoading(true);
    const products = cartProducts.map((cartItem)=> ({ ...cartItem.product, quantity: cartItem.quantity}) );
    try{
      await buyNowStripe(products, state.userEmail);
    }
    finally{
      setIsPaymentLoading(false);
    }
  }

  return (
    <div className={`${styles.cartPage} paddingSide`}>
      {isPaymentLoading && <Loader/>}
      <h1 className={styles.cartHeading}>My Cart</h1>

      <div className={styles.deliveryAddContainer}>
        <h3 className={styles.deliverHeading}>Deliver to:</h3>
        <h3 className={styles.userName}>{state?.userName}</h3>
        {!state?.userAddress.street ? 
            <Link to='/myProfile'> <h3 className={styles.updateAddHeading}>Update profile</h3> </Link> :
            <p className={styles.deliveryAdd}>{state?.userAddress.street}, {state?.userAddress.city}, {state?.userAddress.postalCode}</p>
        }
      </div>

      {!isLoading && cartProducts && cartProducts.length > 0 ? <div className={styles.cartItemContainer}>

      {cartProducts?.map((cartItem, index)=>
        <div key={index} className={styles.cartItem}>
          <i className={`fa-solid fa-delete-left ${styles.deleteProduct}`} onClick={()=>deleteItem(cartItem.product._id)}></i>
          <div className={styles.cartItemImageContainer}>
            <img
              src={`http://localhost:3000/api/product/getImage/${cartItem.product.images[cartItem.product.images.length - 1]}`}
              alt=""
              className={styles.cartItemImage}
            />
          </div>
          <div className={styles.cartItemDetail}>
            <p className={styles.cartItemTitle}>
             {cartItem.product.name}
            </p>
            <div className={styles.quantityButtons}>
              <button className={styles.quantityButton} onClick={()=> updateQuantity(cartItem.product._id, cartItem.quantity, cartItem.product.stock, -1)}>-</button>
              <span className={styles.quantity}>{cartItem.quantity}</span>
              <button className={styles.quantityButton} onClick={()=> updateQuantity(cartItem.product._id, cartItem.quantity, cartItem.product.stock, 1)}>+</button>
            </div>
            <h3 className={styles.cartItemPrice}>₹{cartItem.product.offerPrice*cartItem.quantity.toLocaleString()}</h3>
          </div>
        </div>)
    }

        <div className={styles.checkOutSection}>
          <h3 className={styles.itemsTotalAmount}>Total: ₹{total.toLocaleString()}</h3>
          <button className={styles.checkOutButton} onClick={checkout}>Check out</button>
        </div>
      </div> : <h3 className={styles.noItemHeading}>No items</h3> }
    </div>
  );
}

export default Cart;
