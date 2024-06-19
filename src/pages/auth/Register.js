import React, { useState, useEffect } from 'react'
import styles from "./auth.module.scss"
import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { validateEmail } from '../../services/authService'
import { registerUser } from '../../redux/features/auth/authSlice'
import { SET_LOGIN, SET_NAME, RESET } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'



const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
}


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const { name, email, password, confirmpassword } = formData

  const {isLoading: reduxLoading, isLoggedIn, isSuccess, message} = useSelector((state)=> state.auth)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value })
  }

  const register = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      return toast.error("All fields are required")
    }
    if (password !== confirmpassword) {
      return toast.error("Passwords do not match")
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }

    const userData = {
      name, email, password,
    }
    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
     
    }
    await dispatch(registerUser(userData))
  };

  useEffect(()=>{
    if(isSuccess && isLoggedIn){
      navigate("/dashboard")
    }
    dispatch(RESET())
  },[isLoggedIn, isSuccess, dispatch, navigate])

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input type="text" placeholder="Name" required name='name' value={name} onChange={handleInputChange} />
            <input type="email" placeholder="Email" required name='email' value={email} onChange={handleInputChange} />
            <input type="password" placeholder="Password" required name='password' value={password} onChange={handleInputChange} />
            <input type="password" placeholder="Confirm Password" required name='confirmpassword' value={confirmpassword} onChange={handleInputChange} />
            <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
          </form>
          <span className={styles.register}>
            <p>Already an account&nbsp;</p>
            <Link to="/"> Login</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register