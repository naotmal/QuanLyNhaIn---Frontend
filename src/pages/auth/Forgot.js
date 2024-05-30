import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { forgotPassword, validateEmail } from '../../services/authService'

const Forgot = () => {
  const [email, setEmail] = useState("")
const forgot = async (e) =>{
  e.preventDefault();
  if (!email) {
    return toast.error("Please enter your email")
}
if (!validateEmail(email)) {
    return toast.error("Please enter a valid email")
} 
const userData = {
  email
}
await forgotPassword(userData)
setEmail("")
}

  return (
    <div className={`container ${styles.auth}`}>
<Card>
<div className={styles.form}>
    <h2>Forgot Password</h2>
    <form onSubmit={forgot}>
        <input type="email" placeholder="Email"  required name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <button type='submit' className='--btn --btn-primary --btn-block'>Get Reset Email</button>
    </form>
    <span className={styles.register}>
        <Link to="/"> Go back</Link>
    </span>
</div>
</Card>
    </div>
  )
}

export default Forgot