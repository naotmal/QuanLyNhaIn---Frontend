import  { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout"
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddMaterial from "./pages/addMaterial/AddMaterial";
import MaterialDetail from "./components/material/materialDetail/MaterialDetail";
import EditMaterial from "./pages/editMaterial/EditMaterial";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    async function loginStatus() {
      const status = await getLoginStatus()
dispatch(SET_LOGIN(status))
    }
    loginStatus()

  },[dispatch])
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/resetpassword/:resetToken" element={<Reset/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword/" element={<Forgot/>}/>

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/add-material" element={
          <Sidebar>
            <Layout>
              <AddMaterial/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/material-detail/:id" element={
          <Sidebar>
            <Layout>
              <MaterialDetail/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/edit-material/:id" element={
          <Sidebar>
            <Layout>
              <EditMaterial/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/profile" element={
          <Sidebar>
            <Layout>
              <Profile/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/edit-profile" element={
          <Sidebar>
            <Layout>
              <EditProfile/>
            </Layout>
          </Sidebar>
        }/>
      </Routes>
      
      
    </BrowserRouter>
  );
}

export default App;
