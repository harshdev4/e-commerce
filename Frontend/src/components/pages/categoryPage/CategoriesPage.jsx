import React, { useEffect, useState } from 'react'
import styles from './CategoriesPage.module.css';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../../base/api';
import ProductCard from '../../productCard/ProductCard';

const CategoriesPage = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        document.title = category[0].toUpperCase()+category.slice(1,);
        const getProductFn = async () =>{
            try{
                await getProductsByCategory(setProducts, category);
            }

            finally{
                setLoading(false);
            }
        }
        getProductFn();
    }, []);

  return (<>
    {!loading && 
    <div className={`paddingSide`}>
        {products.length > 0 ? 
        <div className={`${styles.productArea}`}>
                {products.length > 0 &&  <div className={styles.productContainer}>
                    {products?.map((product, index) => (
                        <ProductCard product={product} key={index}/>
                    ))}
                </div>}
        </div>
        : <div className={styles.noItemDiv}><h3 className={styles.noItem}>No items yet</h3></div> }
    </div>
    }
    </>
  )
}

export default CategoriesPage;
