import React, { useContext, useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../../base/api';
import styles from './ProductView.module.css';
import { Link } from 'react-router-dom';
import { PopupState } from '../../context/popupContext';

const ProductView = () => {
    const [products, setProducts] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const popupContext = useContext(PopupState);

    useEffect(()=>{
        const productsFn = async()=>{
            await getProducts(setProducts);
        }
        productsFn();
    }, [isDeleted]);
  return (
    <div>
      <table border={1} className={styles.productTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
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
          <td>{product.category}</td>
          <td>₹{product.offerPrice.toLocaleString()}</td>
          <td>₹{product.usualPrice.toLocaleString()}</td>
          <td>{product.stock}</td>
          <td><Link to='#' className={styles.disableAction}><i className="fa-regular fa-pen-to-square"></i></Link></td>
          <td><Link to='#' className={styles.disableAction} onClick={()=> {popupContext.setPopupState(true); popupContext.setConfirmMsg(`Are you sure you want to delete this product ${product._id}`); popupContext.setButtonTitle('Delete'); popupContext.setConfirmAction(()=> ()=>deleteProduct(product._id, setIsDeleted))}}><i className={` ${styles.delete} fa-solid fa-trash`}></i></Link></td>
        </tr>
      ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductView
