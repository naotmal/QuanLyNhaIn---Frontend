import React, { useEffect } from 'react'
import Search from "../../components/search/Search"
import "./ShowAccount.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ChangeRole from '../../components/changeRole/ChangeRole';
import {useDispatch, useSelector} from "react-redux"
import { deleteUser, getUsers } from '../../redux/features/auth/authSlice';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ShowAccount = () => {
    const dispatch = useDispatch()
    const {users, isLoading, isLoggedIn, isSuccess, message} = useSelector((state)=> state.auth)
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])
    const delUser = async(id)=>{
        console.log(id)
        await dispatch(deleteUser(id))
        await dispatch(getUsers())
      }
    const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete User",
          message: "Are you sure you want to delete this user.",
          buttons: [
            {
              label: "Delete",
              onClick: () => delUser(id),
            },
            {
              label: "Cancel",
              // onClick: () => alert('Click No')
            },
          ],
        });
      };
    
    return (
        <div>
            <div className="user-list">
                <div className="table">
                    <div className="--flex-between">

                        <span>
                            <h3>All users</h3>
                        </span>
                        <span>
                            <Search
                                placeHolder="Search user" />
                        </span>
                    </div>
                    {!isLoading && users.length === 0 ? (
                        <p>No user found</p>
                    ):(
                        <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index)=>{
                            const {_id, name, email, role}=user
                            return(
<tr key={_id}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{role}</td>
                            <td><ChangeRole _id={_id}/></td>
                            <td>
                                <span className=' icons'>
                                    <FaTrashAlt size={20} onClick={() => confirmDelete(_id)}/>
                                </span>
                            </td>
                        </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
                    )}
                    
                </div>
                

            </div>
        </div>
    )
}

export default ShowAccount