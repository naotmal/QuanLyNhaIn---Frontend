import { selectIsLoggedin, selectUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux"


export const AdminLink = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedin)
    const user = useSelector(selectUser)

    if (isLoggedIn && (user.role === "Admin")) {
        return <>{children}</>
    }
    return null;
}


export const SaleLink = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedin)
    const user = useSelector(selectUser)

    if (isLoggedIn && (user.role === "Admin" || user.role === "Sale")) {
        return <>{children}</>
    }
    return null;
}


