import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css';
import { getNewProducts, getProductsByCategory } from '../../../base/api';
import ProductCard from '../../productCard/ProductCard';

const HomePage = () => {
    const imageApiUrl = 'http://localhost:3000/api/product/getImage/'
    const [newProducts, setNewProducts] = useState([]);
    const [homeProducts, setHomeProducts] = useState([]);
    const [officeProducts, setOfficeProducts] = useState([]);
    const [schoolProducts, setSchoolProducts] = useState([]);
    const [restaurantProducts, setRestaurantProducts] = useState([]);
    
    useEffect(()=>{
        const getProductFn = async () =>{
            await getNewProducts(setNewProducts);
            await getProductsByCategory(setHomeProducts, 'Home');
            await getProductsByCategory(setOfficeProducts, 'Office');
            await getProductsByCategory(setSchoolProducts, 'School');
            await getProductsByCategory(setRestaurantProducts, 'Restaurant');
        };

        getProductFn();
    }, []);

  return (
    <div className={`${styles.homePage} paddingSide`}>
        <div className={styles.heroBannerContainer}>
          <img src="/images/hero-banner.webp" alt="hero-banner" className={styles.heroBanner} />
        </div>

        {/* new arrivals */}

        <div className={`${styles.productBlock} ${styles.newBlock}`}>
            <h2 className={styles.productHeading}>New Arrivals</h2>
            <div className={styles.productContainer}>
                {newProducts.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>

        {/* home products */}
        <div className={`${styles.productBlock} ${styles.newBlock}`}>
            <h2 className={styles.productHeading}>Decor Home</h2>
            <div className={styles.productContainer}>
                {homeProducts.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>

        {/* office products */}
        <div className={`${styles.productBlock} ${styles.newBlock}`}>
            <h2 className={styles.productHeading}>Office Products</h2>
            <div className={styles.productContainer}>
                {officeProducts.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>

        {/* kitchen products */}
        <div className={`${styles.productBlock} ${styles.newBlock}`}>
            <h2 className={styles.productHeading}>Kitchen Products</h2>
            <div className={styles.productContainer}>
                {restaurantProducts.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>

        {/* school products */}
        <div className={`${styles.productBlock} ${styles.newBlock}`}>
            <h2 className={styles.productHeading}>School Products</h2>
            <div className={styles.productContainer}>
                {schoolProducts.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>
    </div>
  )
}
 
export default HomePage
