import React from 'react'
import styles from "./auth.module.scss"
import { BiLogIn } from "react-icons/bi"
import Card from "../../components/card/Card"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { SET_LOGIN, SET_NAME, SET_ROLE } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import useRedirectLoggedInUser from '../../customHook/useRediractLoggedInUser copy'

const initialState = {

    email: "",
    password: "",

}


const Login = () => {
    useRedirectLoggedInUser("/dashboard")
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setformData] = useState(initialState)
    const { email, password } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value })
    }

    const login = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            return toast.error("All fields are required")
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email")
        }
        const userData = {
            email, password
        }
        setIsLoading(true)
        try {
            const data = await loginUser(userData)
            console.log(data)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            await dispatch(SET_ROLE(data.role))
            navigate("/dashboard")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (

        <div className={`container ${styles.auth}`}>
{isLoading && <Loader/>}

            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <BiLogIn size={35} color="#999" />

                    </div>
                    <h2>Login</h2>
                    <form onSubmit={login}>
                        <input type="email" placeholder="Email" required name='email' value={email} onChange={handleInputChange} />
                        <input type="password" placeholder="Password" required name='password' value={password} onChange={handleInputChange} />
                        <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                    </form>
                    <Link to="/forgotpassword">Forgot Password</Link>
                    <span className={styles.register}>
                        <p>Don't have an account&nbsp;</p>
                        <Link to="/register"> Register</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Login
