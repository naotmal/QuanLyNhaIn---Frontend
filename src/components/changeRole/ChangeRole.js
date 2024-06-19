import React, { useState } from 'react'
import { IoSaveSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { getUsers, upgradeUser } from '../../redux/features/auth/authSlice';
import { toast } from "react-toastify";


const ChangeRole = ({ _id }) => {
  const [userRole, setUserRole] = useState("")
  const dispatch = useDispatch()
  //upgrade user
  const changeRole = async (e) => {
    e.preventDefault()
    if (!userRole) {
      toast.error("Plase select a role")
    }
    const userData = {
      role: userRole,
      id: _id,
    }
    await dispatch(upgradeUser(userData))
    await dispatch(getUsers())
  }
  return (
    <div className="sort">
      <form className="d-flex" onSubmit={(e) => changeRole(e, _id, userRole)}>
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">--select--</option>
          <option value="Admin">Admin</option>
          <option value="Sale">Sale</option>
          <option value="Product">Product</option>
        </select>
        <button className='--btn-select'>
          <IoSaveSharp size={15} />
        </button>
      </form>
    </div>
  )
}

export default ChangeRole