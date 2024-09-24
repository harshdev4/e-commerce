import React, { useContext, useEffect, useRef, useState } from "react";
import styles from './ProductForm.module.css';
import { addProduct } from "../../base/api";
import { ErrorStateContext } from "../../context/errorState";
import NotifyPopup from "../notifyPop/NotifyPopup";

const ProductForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const leftBtn = useRef(null);
    const rightBtn = useRef(null);

    const {errorState, setErrorState} = useContext(ErrorStateContext);
    const [notifyText, setNotifyText] = useState("");
    const [color, setColor] = useState("");

    const changePrev = ()=>{
      const newImageOrder = [selectedImages[selectedImages.length-1], ...selectedImages.slice(0,selectedImages.length-1)];
      setSelectedImages(newImageOrder);
    }
    
    const changeNext = ()=>{
      const newImageOrder = [...selectedImages.slice(1,selectedImages.length), selectedImages[0]];
      setSelectedImages(newImageOrder);
    }

    useEffect(()=>{
      setErrorState(false);
    }, []);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    files.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

    const imageFiles = files.map((file)=> URL.createObjectURL(file));
    setSelectedImages(imageFiles)
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.elements.images.files;

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    formData.append('name', e.target.name.value);
    formData.append('desc', e.target.desc.value);
    formData.append('feature', e.target.feature.value);
    formData.append('offerPrice', e.target.offerPrice.value);
    formData.append('usualPrice', e.target.usualPrice.value);
    formData.append('category', e.target.category.value);
    formData.append('stock', e.target.stock.value);

    await addProduct(formData, setErrorState, setNotifyText, setColor);
    setSelectedImages([]);
    e.target.reset();
  }
  return (
    <div>
      { errorState && <NotifyPopup notifyText={notifyText} color={color}></NotifyPopup> }
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          {selectedImages.length > 1 && <i ref={leftBtn} className={`${styles.changeImageBtn} ${styles.changeLeft} fa-solid fa-chevron-left`} onClick={changePrev}></i>}
          {selectedImages.length == 0 && <img src="/images/Preview_logo.webp" alt="previewImage" className={styles.previewImage}/> }
        {selectedImages.map((image, index)=>(
            <img key={index} src={image} alt={`image${index}`} className={styles.previewImage} style={{zIndex: selectedImages.length - index}}/>
        )) }
          {selectedImages.length > 1 && <i ref={rightBtn} className={` ${styles.changeImageBtn} ${styles.changeRight} fa-solid fa-chevron-right`} onClick={changeNext}></i>}
        </div> 
      </div>
      <form className={styles.productForm} onSubmit={handleSubmit}>
        <input className={styles.productInput} type="file" name="images" id="image" accept="image/*" multiple onChange={handleImageSelect} required/>

        <label htmlFor="name">Product Name</label>
        <input className={styles.productInput} type="text" name="name" id="name" placeholder="Product name" required />

        <label htmlFor="desc">Product Description</label>
        <textarea className={styles.productInput} type="text" name="desc" id="desc" rows='10' placeholder="Product description" required ></textarea>

        <label htmlFor="productFeatures">Features</label>
        <textarea className={styles.productInput} name="feature" id="productFeatures" rows="5" placeholder="Product features separated by 'enter button'" required></textarea>

        <label htmlFor="offerPrice">Offer Price</label>
        <input className={styles.productInput} type="text" name="offerPrice" id="offerPrice" placeholder="Offer price" required />

        <label htmlFor="usualPrice">Usual Price</label>
        <input className={styles.productInput} type="text" name="usualPrice" id="usualPrice" placeholder="Usual price" required />

        <label htmlFor="category">Catergory</label>
        <select className={styles.productInput} name="category" id="category" required>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="School">School</option>
          <option value="Stationary">Stationary</option>
          <option value="Sports">Sports</option>
          <option value="Restaurant">Restaurant</option>
        </select>
        <label htmlFor="stock">Stock Qtnty</label>
        <input className={styles.productInput} type="number" name="stock" id="stock" placeholder="Stock quantity" required/>

        <input className={styles.productInputSubmit} type="submit" value="Add Product" />

      </form>
    </div>
  );
};

export default ProductForm;
