import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { useState } from 'react';
import { searchProduct } from '../../base/api';
import ProductCard from '../productCard/ProductCard';

const SearchBar = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const backFn = () => {
        navigate(-1);
    }
    
    const handleSearch = async (e)=>{
        if (e.target.value != '') {
            await searchProduct(e.target.value, setProducts);
        }
        else{
            setProducts([]);
        }
    }

    return (
        <>
            <div className={`paddingSide header ${styles.searchBarContainer}`}>
                <i className={`fa-solid fa-arrow-left ${styles.backBtn}`} onClick={backFn}></i>
                <div className={styles.searchBarBlock}>
                    <i className={`${styles.magnifyIcon} fa-solid fa-magnifying-glass`} ></i>
                    <input type="text" className={styles.searchBar} name="" id="" autoFocus onChange={handleSearch}/>
                </div>
            </div>
            <div className={`${styles.productArea} paddingSide`}>
                {products.length > 0 &&  <div className={styles.productContainer}>
                    {products.map((product, index) => (
                        <ProductCard product={product} key={index}/>
                    ))}
                </div>}
            </div>
        </>
    )
}

export default SearchBar;