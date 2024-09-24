import React, { useContext, useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { EditInfoContext } from "../../context/editInfoContext";
import { useNavigate, useParams } from "react-router-dom";
import { AuthUserState } from "../../context/authUserContext";
import { editUserData } from "../../base/api";
import AuthError from "../authError/AuthError";
import { ErrorStateContext } from "../../context/errorState";

const EditProfile = () => {

  const navigate = useNavigate();
  const { editType } = useParams();
  const [editData, setEditData] = useState({});
  
  const edit = editType.slice(0,1).toUpperCase()+editType.slice(1);
  
  const { editInfoState, dispatchEditInfo } = useContext(EditInfoContext);
  const { state, dispatch } = useContext(AuthUserState);

  const { errorState, setErrorState } = useContext(ErrorStateContext);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = "Edit Profile - MAYA";
    setErrorState(false);

    if (state.userLoading) return;

    if (!state.login) {
      navigate("/login");
    }
    if (editType) {
      dispatchEditInfo({ type: editType });
    }
  }, [editType, state.login, state.userLoading]);

  const handleEdit = (e)=>{
    const {name, value} = e.target;
    setEditData({
      ...editData,
      [name]: value
    });

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    editUserData(state.userId, editType, editData, state.updated, navigate, dispatch, setErrorState, setErrorMsg);
  }

  return (
    <div className={styles.editProfileContainer}>
      <div className={styles.smallContainer}>
      { errorState && <AuthError errorText={errorMsg}/> }
        <h2 className="heading">Edit {edit} </h2>
        <p className={styles.subHeading}>Change your email here</p>
        <form className={styles.editForm} onSubmit={handleSubmit}>
          {editInfoState.map((input, index) => {
            return (
              <input
                className={styles.editInputField}
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                required={input.required}
                defaultValue={editType == 'address' ? state[`user${edit}`][input.name] : state[`user${edit}`]}
                onChange={handleEdit}
              />
            );
          })}
          <div className={styles.aboutChange}>
            <p className={styles.aboutChangePara}>This {edit} will be used for further actions performed on MAYA</p>
          </div>
          <input type="submit" className={styles.editButton} value={`Change ${edit} `} /> 
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
