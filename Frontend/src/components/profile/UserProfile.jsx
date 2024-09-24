import React, { useContext, useEffect } from "react";
import styles from "./UserProfile.module.css";
import { AuthUserState } from "../../context/authUserContext";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { state } = useContext(AuthUserState);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Profile - MAYA";
    if (state.userLoading) {
      return;
    }

    if (!state.login) {
      navigate("/login");
    }
  }, [state.login, state.userLoading]);

  return (
    <div className={`${styles.userProfilePage} paddingSide`}>
      <h2 className="heading">Profile</h2>
      <p className={styles.profileSubHeading}>
        Infomation about you linked with MAYA
      </p>

      <div className={styles.userInfoContainer}>
        <h3 className={styles.infoCategory}>Basic Info</h3>
        <div
          className={`${styles.basicInfoContainer} ${styles.smInfoContainer}`}
        >
          <div className={styles.info}>
            <div className={styles.infoText}>
              <div className="label">
                <h3 className={styles.label}>Name</h3>
              </div>
              <div className={styles.userInfoDiv}>
                <h3 className={styles.userInfo}>{state.userName}</h3>
              </div>
            </div>

            <Link to='/profile/name/edit' className={`${styles.edit} removeLinkEffect`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </div>

          <div className={styles.info}>
            <div className={styles.infoText}>
              <div className="label">
                <h3 className={styles.label}>Email</h3>
              </div>
              <div className={styles.userInfoDiv}>
                <h3 className={styles.userInfo}>{state.userEmail}</h3>
              </div>
            </div>
            <Link to='/profile/email/edit' className={`${styles.edit} removeLinkEffect`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </div>

          <div className={styles.info}>
            <div className={styles.infoText}>
              <div className="label">
                <h3 className={styles.label}>Phone</h3>
              </div>
              <div className={styles.userInfoDiv}>
                <h3 className={styles.userInfo}>{state.userMobileNo}</h3>
              </div>
            </div>
            {/* <div className={styles.edit}>
              <i className="fa-regular fa-pen-to-square"></i>
            </div> */}
          </div>
        </div>

        <h3 className={styles.infoCategory}>Address</h3>
        <div className={`${styles.addressInfoContainer} ${styles.smInfoContainer}`}>
          <div className={styles.info}>
            <div className={styles.infoText}>
              <div className="label">
                <h3 className={styles.label}>Street</h3>
              </div>
              <div className={styles.userInfoDiv}>
                <h3 className={styles.userInfo}>{state.userAddress.street}</h3>
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoText}>
              <div className="label">
                <h3 className={styles.label}>City</h3>
              </div>
              <div className={styles.userInfoDiv}>
                <h3 className={styles.userInfo}>{state.userAddress.city}</h3>
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoText}>
              <div className="label">
                <h3 className={styles.label}>Postal Code</h3>
              </div>
              <div className={styles.userInfoDiv}>
                <h3 className={styles.userInfo}>{state.userAddress.postalCode}</h3>
              </div>
            </div>
          </div>
          <div className={styles.changeAddressBlock}>
            <Link to='/profile/address/edit' className={`${styles.edit} ${styles.changeAddress} removeLinkEffect`}>
                <h3 className={styles.changeHeading}>Update Addresss</h3>
                <i className={`fa-regular fa-pen-to-square ${styles.addPencilIcon}`}></i>
            </Link>
          </div>
        </div>

        <div className={`${styles.passwordContainer}`}>
          <h3 className={styles.password}>Update Password</h3>{" "}
          <div className={styles.chvronDiv}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
