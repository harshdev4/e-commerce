import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buyNowStripe, getProductById, setCartItem } from '../../base/api';
import ImgSlider from '../imageSlider/ImgSlider';
import { AuthUserState } from '../../context/authUserContext';
import Loader from '../loader/Loader';

const ProductPage = () => {
  const navigate = useNavigate();

  const {state} = useContext(AuthUserState);
  
  const { productId } = useParams();
  const [productData, setProductData] = useState();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [cartState, setCartState] = useState("add to cart")
  const [images, setImages] = useState([]);
  let today = new Date(Date.now() + 4*24*60*60*1000);
  const deliveryMonth = today.toLocaleString('en-US', {month: 'long'});
  const deliveryDate = today.getDate();

  useEffect(()=>{
    document.title = productData?.name;
    const getProductFn = async ()=>{
      await getProductById(productId, setProductData);
    }

    if (!productData) {
      getProductFn();
    }

    if (productData) {
      setImages(productData.images.reverse());
    }
  }, [productData]);

  const addToCart = async (productId)=>{
    const newCartItem = {
      product: productId,
      quantity: 1
    }
    if (!state.login) {
      let cart = JSON.parse(localStorage.getItem('mayaCart')) || [];
      const found = cart.find((item)=> item.product == productId);
      if (found) {
        setCartState('Already Added');
      }
      else{
        cart.push(newCartItem);
        localStorage.setItem('mayaCart', JSON.stringify(cart));
        setCartState('Added');
      }
    }
    else{
      await setCartItem(newCartItem);
      setCartState('Added')
    }
  }

  const saveSummary = () =>{
    navigate('/checkout/product/summary/66e0473866e04738aa582c7fc5eb889baa582c7fc5eb889b');
    localStorage.setItem('summaryProduct', JSON.stringify({...productData, quantity: 1}));
  }

  return (
    <>
    {isPaymentLoading && <Loader/>}
    {!productData && <Loader/>}
    {productData &&
    <div className={`${styles.productPage} paddingSide `}>
      <div className={styles.gridDiv}>
        <div className={styles.gridLeft}><ImgSlider images={images}/>
          <div className={styles.actionBtnContainer}>
            <button className={`${styles.actionBtn} ${styles.cartBtn}`} onClick={()=>addToCart(productData._id)}><i className="fa-solid fa-cart-shopping"></i> {cartState}</button>
            <button className={`${styles.actionBtn} ${styles.buyBtn} removeLinkEffect`} onClick={saveSummary}><i className="fa-solid fa-bolt"></i> Buy now</button>
          </div>
        </div>
        
        <div className={styles.gridRight}>
            <div className={styles.titleDiv}> <p className={styles.productTitle}>{productData.name}</p> </div>
            <div className={styles.priceDiv}> <h3 className={styles.offerPrice}>₹{(productData?.offerPrice).toLocaleString()}</h3>  <h3 className={styles.usualPrice}>₹{(productData?.usualPrice).toLocaleString()}  </h3> <h3 className={styles.discountPercentage}>{Math.round(((productData.usualPrice - productData.offerPrice)/productData.usualPrice)*100)}% off</h3> </div>
            <div className={`${styles.aboutGrid} ${styles.stocksDiv}`}><h3 className={styles.heading}>Quantity</h3> <span className={styles.stock}>{productData.stock}</span> </div>
            <div className={styles.deliveryInfoDiv}><p className={styles.deliveryInfo}>Delivered by {deliveryDate}<sup>th</sup> {deliveryMonth} on <span style={{color: '#db5d3fe0'}}>"{state.userAddress.postalCode}"</span></p></div>
            <div className={`${styles.overviewDiv} ${styles.aboutGrid}`}><h3 className={styles.heading}>Overview</h3>
            <div className={styles.overviewContentDiv}><p className={styles.overviewContent}>{productData.description}</p></div></div>
            <div className={`${styles.highlightDiv} ${styles.aboutGrid}`}><h3 className={styles.heading}>Highlights</h3>
            <div className={styles.highlightContentDiv}>
                <div className={styles.highlightListDiv}>
                    {productData.features.split('\n').map((feature, index) =>(<div className={styles.listGrid} key={index}> <div className={styles.listDot}>•</div> <div className={styles.featureContent}>{feature}</div></div>))}
                </div>
            </div></div>
        </div>
      </div>
    </div> }
    </>
  )
}

export default ProductPage
