import React from 'react'
import { logoutUser } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
const name = useSelector(selectName)

    const logout = async()=>{
await logoutUser();
await dispatch(SET_LOGIN(false))
navigate("/")
    }
    return (
        <div className="--pad header">
            <div className="--flex-between">
                <h3>
                    <span className="--fw-thin">Welcome,</span>
                    <span className="text-dark px-2">{name}</span>
                </h3>
                <button onClick={logout} className="--btn --btn-secondary">Logout</button>
            </div>
        </div>
    )
}

export default Header