import React, { useEffect, useState } from 'react'
import { getProductsCategory } from '../../base/api';
import styles from './ProductView.module.css';
import { Link } from 'react-router-dom';

const CategoryView = ({category}) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const categoryProducts = async()=>{
            await getProductsCategory(setProducts, category);
        }
        categoryProducts();
    }, [category]);

  return (
    <div>
        <h3 style={{margin: '15px 0'}}>Category: <span style={{fontWeight: 'lighter'}}>{category}</span></h3>
      <table border={1} className={styles.productTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Offer Price</th>
            <th>Usual Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
      {products.map((product, index)=> (
        <tr key={index}>
          <td><img src={`http://localhost:3000/api/product/getImage/${product.images[product.images.length-1]}`} alt={product.name} className={styles.productImg}/></td>
          <td>{product.name}</td>
          <td>₹{product.offerPrice.toLocaleString()}</td>
          <td>₹{product.usualPrice.toLocaleString()}</td>
          <td>{product.stock}</td>
          <td><Link to='#' className={styles.disableAction}><i className="fa-regular fa-pen-to-square"></i></Link></td>
          <td><Link to='#' className={styles.disableAction}><i className={` ${styles.delete} fa-solid fa-trash`}></i></Link></td>
        </tr>
      ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryView

