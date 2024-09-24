import React, { useContext, useEffect, useState } from 'react'
import styles from './Dashboard.module.css';
import { AuthUserState } from '../../context/authUserContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import AllUsers from './AllUsers';
import Categories from './Categories';
import NotifyPopup from '../notifyPop/NotifyPopup';
import ProductView from './ProductView';
import CategoryView from './CategoryView';

const Dashboard = () => {

  const navigate = useNavigate();
  
  const { state } = useContext(AuthUserState);

  const [action, setAction] = useState('addProduct');
  const [category, setCategory] = useState('');


  useEffect(()=>{
    document.title = "Admin-Dashboard";
    if (state.userLoading) {
      return;
    }

    if (!state.login || !state.isAdmin) {
      navigate("/");
    }
  }, [state.userLoading, state.login, state.isAdmin]);

  return (
    <>
    {state.isAdmin &&
      <div className={styles.dashboardPage}>
        <h1 className={styles.dashboardHeading}>Dashboard</h1>
        <div className={styles.actionBlock}>
          <div className={styles.actionGrid}>
            <div className={styles.actions}>
              <div className={styles.action} style={{backgroundColor: action === 'addProduct'? 'grey': ''}} onClick={()=> setAction('addProduct')}>Add Product</div>
              <div className={styles.action} style={{backgroundColor: action === 'viewProducts' ? 'grey': ''}} onClick={()=> setAction('viewProducts')}>All Products</div>
              <div className={`${styles.categoriesContainer}`}> <div className={styles.action} style={{backgroundColor: action === 'categories' ? 'grey': ''}}> Categories </div> 
                <div className={styles.categoriesContent}>
                  <div className={styles.categorie} onClick={()=> { setCategory('Home'); setAction('categories')}}>Home</div>
                  <div className={styles.categorie} onClick={()=> { setCategory('Office'); setAction('categories')}}>Office</div>
                  <div className={styles.categorie} onClick={()=> { setCategory('School'); setAction('categories')}}>School</div>
                  <div className={styles.categorie} onClick={()=> { setCategory('Stationary'); setAction('categories')}}>Stationary</div>
                  <div className={styles.categorie} onClick={()=> { setCategory('Sports'); setAction('categories')}}>Sports</div>
                  <div className={styles.categorie} onClick={()=> { setCategory('Restaurant'); setAction('categories')}}>Restaurant</div>
                </div>
              </div>

              <div className={styles.action} style={{backgroundColor: action === 'viewUsers' ? 'grey': ''}} onClick={()=> setAction('viewUsers')}>All Users</div>
            </div>
          </div>
          <div className={`${styles.actionContainer} paddingSide`}>
            {action === 'addProduct' && <ProductForm></ProductForm>}
            {action === 'viewProducts' && <ProductView></ProductView>}
            {action === 'categories' && <CategoryView category={category}></CategoryView> }
            {action === 'viewUsers' && <AllUsers/>}
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default Dashboard
