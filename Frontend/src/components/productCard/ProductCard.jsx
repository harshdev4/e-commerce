import React from 'react'
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
    const imageApiUrl = 'http://localhost:3000/api/product/getImage/'
  return (
    <div className={styles.product}>
        <Link to={`/product/${product._id}`} className='removeLinkEffect'>
        <div className={styles.productImageContainer}><img src={`${imageApiUrl}${product.images[product.images.length - 1]}`} alt="" /></div>
        <div className={styles.productInfoContainer}>
            <div className={styles.productTitleContainer}><p>{product.name}</p></div>
            <div className={styles.productPriceContainer}>
                <div className={styles.productOfferPriceContainer}><h3>₹{product.offerPrice.toLocaleString()}</h3></div>
                <div className={styles.productUsualPriceContainer}><h3>₹{product.usualPrice.toLocaleString()}</h3></div>
                <span className={styles.dicountPercent}>{Math.round(((product.usualPrice - product.offerPrice)/product.usualPrice)*100)}% off</span>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default ProductCard
