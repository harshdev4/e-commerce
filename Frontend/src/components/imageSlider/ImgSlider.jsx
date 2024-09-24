import { useRef, useState } from "react";
import styles from "./ImgSlider.module.css";


const ImgSlider = ({images}) => {
  const [count, setCount] = useState(0);

  const containerPosition = useRef(1);

  const imageContainer = useRef(null);

  const handlePrev = () => {
    const images = imageContainer.current;
    if (images) {
      if (containerPosition.current !== 1) {
        images.style.left = `${-(containerPosition.current - 1) * 100 + 100}%`;
        setCount((previous)=> previous - 1);
        containerPosition.current--;
        console.log(containerPosition);
        
      } else {
        images.style.left = "0%";
      }
    }
  };

  const handleNext = () => {
    const imgs = imageContainer.current;
    if (imgs && containerPosition.current <= images.length - 1) {
      imgs.style.left = `-${containerPosition.current * 100}%`;
      setCount((previous)=> previous + 1);
      containerPosition.current++;
      console.log(containerPosition);
    }
  };

  return (
    <div className={styles.imgslider}>
      <div className={styles.slider}>
        <div className={styles.imageContainer} ref={imageContainer}>
          {images.map((image, index) => (
            <div className={styles.imgWL} key={index}>
              <img
                src={`http://localhost:3000/api/product/getImage/${image}`}
                alt="images"
                className={styles.image}/>
              <span className={styles.imageLabel}>
                {index + 1}/{images.length}
              </span>{" "}
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <i className={`${styles.slideBtnLeft} fa-solid fa-chevron-left`} onClick={handlePrev}></i>
          <i className={`${styles.slideBtnRight} fa-solid fa-chevron-right`}onClick={handleNext}></i>
        </div>
      </div>
      <div className={styles.positionDotContainer}>
        {images.map((image, index)=> <div key={index} className={styles.positionDot} style={{backgroundColor: count == index ? '#5353539e': 'unset'}}></div> )}
      </div>
    </div>
  );
}

export default ImgSlider;