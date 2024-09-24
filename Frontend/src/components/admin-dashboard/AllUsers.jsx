import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { banUser, deleteUser, getUsers } from '../../base/api';
import styles from './AllUsers.module.css';
import { PopupState } from '../../context/popupContext';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [banStatus, setBanStatus] = useState(false);
    const popupContext = useContext(PopupState);

    useEffect(()=>{
        const users = async ()=>{           
            await getUsers(setUsers);
            setIsDeleted(false);
            setBanStatus(false);
        }
        users();
    }, [isDeleted, banStatus]);

  return (
    <div>
      <div className="userContainer">
        <table border='1' className={styles.userTable}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Block</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
            {
            users.map((user, index)=>(
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNo}</td>
                    <td><Link to='#' className={styles.disableAction} onClick={()=> {popupContext.setPopupState(true); popupContext.setConfirmMsg(`Are you sure you want to ${user.isBanned ? 'unban' : 'ban'} this user ${user._id}`); popupContext.setButtonTitle(`${user.isBanned ? 'Unban' : 'Ban'}`); popupContext.setConfirmAction(()=> ()=>banUser(user._id, `${user.isBanned ? 'unban' : 'ban'}`, setBanStatus))}}><i className="fa-solid fa-ban" style={{color: user.isBanned ? 'red': 'black'}}></i></Link></td>
                    <td><Link to='#' className={styles.disableAction} onClick={()=> {popupContext.setPopupState(true); popupContext.setConfirmMsg(`Are you sure you want to delete this user ${user._id}`); popupContext.setButtonTitle('Delete'); popupContext.setConfirmAction(()=> ()=>deleteUser(user._id, setIsDeleted))}}><i className={` ${styles.delete} fa-solid fa-trash`}></i></Link></td>
                </tr>
            ))
        }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers
