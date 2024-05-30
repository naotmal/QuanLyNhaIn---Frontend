import React from 'react'
import styles from "./auth.module.scss"
import Card from "../../components/card/Card"
import { Link, useParams } from 'react-router-dom'
import {useState} from "react"
import { toast } from "react-toastify"
import {resetPassword} from "../../services/authService"


const initialState = {

 
  password: "",
  confirmpassword: "",

}

const Reset = () => {
  const [formData, setformData] = useState(initialState)
    const {password, confirmpassword } = formData

    const {resetToken} = useParams()

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setformData({ ...formData, [name]: value })
  }

const reset = async (e) =>{
  e.preventDefault()
  
  if (password.length < 6) {
    return toast.error("Passwords must be up to 6 characters")
  }
  if (password !== confirmpassword) {
    return toast.error("Passwords do not match")
  }
  const userData = {
    password, confirmpassword
  }
  try{
    const data = await resetPassword(userData, resetToken)
    toast.success(data.message)
  } catch (error){
    console.log(error.message)
  }
}

  return (
    <div className={`container ${styles.auth}`}>
<Card>
<div className={styles.form}>
    <h2>Reset Password</h2>
    <form onSubmit={reset}>
    <input type="password" placeholder="New Password"  required name='password' value={password} onChange={handleInputChange} />
        <input type="password" placeholder="Confirm New Password"  required name='confirmpassword' value={confirmpassword} onChange={handleInputChange} />
        <button type='submit' className='--btn --btn-primary --btn-block'>Reset password</button>
    </form>
    <span className={styles.register}>
        <Link to="/"> Login</Link>
    </span>
</div>
</Card>
    </div>
  )
}

export default Reset