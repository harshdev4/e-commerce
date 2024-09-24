import styles from "./Header.module.css";
import ReactTypingEffect from "react-typing-effect";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthUserState } from "../../context/authUserContext";
import { logoutUser } from "../../base/api";
import ConfirmPopUp from "../confirmPop/ConfirmPopUp";
import { PopupState } from "../../context/popupContext";
import CategoryBar from "../categories/CategoryBar";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {state, dispatch} = useContext(AuthUserState);
  const popupContext = useContext(PopupState);

  return ( 
    <>
      <div className="paddingSide header">
        <div className={styles.headerBlock} style={{marginLeft: location.pathname != '/' ? '3rem' : '0'}}>
        {location.pathname!='/' && <i className={`${styles.backArrow} fa-solid fa-arrow-left`} onClick={()=>navigate(-1)}></i>}
          <Link to='/'>
            <div className={styles.logoContainer}>
              <img
                src="/images/vector.svg"
                alt="Maya Logo"
                className={styles.logoImage}
              />
            </div>
          </Link>
          <Link to="/search" className="removeLinkEffect">
            <div className={styles.searchBlock}>
              <i
                className={`${styles.magnifyIcon} fa-solid fa-magnifying-glass`}
              ></i>
              <div className={styles.searchBar}>
                {" "}
                Search{" "}
                <ReactTypingEffect
                  text={["Furniture", "Wooden Chair"]}
                  speed={100}
                  eraseDelay={2000}
                />
              </div>
            </div>
            <i className={`${styles.magnifyIconSm} fa-solid fa-magnifying-glass`}></i>
          </Link>

          <div className={styles.authBtnBlock}>
            <div className={styles.loginSection}>
              <Link to='#' className="removeLinkEffect">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`svg-inline--fa fa-circle-user fa-xl ${styles.profileIconContainer}`}><path fill="currentColor" d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" className={styles.profileIcon}></path></svg>
                <button className={`${styles.loginBtn} ${styles.hideLabel}`}>{state.userName ? state.userName : "Login"}</button>
              </Link>
              <i className={`${styles.chevron} fa-solid fa-chevron-down`}></i>
            </div>


            <div className={styles.hoverLoginMenu}>
              <div className={styles.menuContainer}>
                {!state?.userName && <><Link to='/login' className="removeLinkEffect">Login</Link>
                <Link to='/signUp' className="removeLinkEffect">Sign up</Link></>}
                <Link to='/myProfile' className="removeLinkEffect">My Profile</Link>
                {state.isAdmin && <Link to='/admin/dashboard' className="removeLinkEffect">Dashboard</Link>}
                {!state.isAdmin && <Link to='/myOrders' className="removeLinkEffect">My Orders</Link>}
                {!state.isAdmin && <Link to='/cart' className="removeLinkEffect">Cart</Link>}
                {state?.userName && <a href="#logout" className="removeLinkEffect" onClick={()=> {popupContext.setPopupState(true); popupContext.setConfirmMsg(`Are you sure you want to logout?`); popupContext.setButtonTitle('Logout'); popupContext.setConfirmAction(()=> ()=>logoutUser(dispatch, navigate))}}>Logout</a>}
              </div>
            </div> 
          </div>

          <div className={styles.cartBlock}>
            <Link to="/cart" className="removeLinkEffect">
              <i className={` ${styles.cart} fa-solid fa-cart-shopping`}></i>
              <span className={styles.hideLabel}>Cart</span>
            </Link>
          </div>
        </div>
      </div>
      {location.pathname === '/' && 
        <CategoryBar/>
      }
    </>
  );
};

export default Header;
