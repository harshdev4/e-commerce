import React from "react";
import styles from "./CategoryBar.module.css";
import { Link } from "react-router-dom";

const CategoryBar = () => {
  return (
    <div className={`${styles.categoryBar} paddingSide`}>
      <Link to='/category/home' className={styles.category}>
        <img src="/images/home.webp" alt="Home" />
        <p>Home</p>
      </Link>
      <Link to='/category/office' className={styles.category}>
        <img src="/images/office.webp" alt="Office" />
        <p>Office</p>
      </Link>
      <Link to='/category/school' className={styles.category}>
        <img src="/images/school.webp" alt="School" />
        <p>School</p>
      </Link>
      <Link to='/category/book' className={styles.category}>
        <img src="/images/book.webp" alt="Book" />
        <p>Book</p>
      </Link>
      <Link to='/category/sports' className={styles.category}>
        <img src="/images/sports.webp" alt="Sports" />
        <p>Sports</p>
      </Link>
      <Link to='/category/restaurant' className={styles.category}>
        <img src="/images/restaurant.webp" alt="Restaurant" />
        <p>Restaurant</p>
      </Link>
    </div>
  );
};

export default CategoryBar;
