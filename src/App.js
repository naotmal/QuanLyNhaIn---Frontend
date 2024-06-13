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
import AddReceipt from "./pages/addReceipt/AddReceipt";

import ShowMaterial from "./pages/showMaterial/ShowMaterial"
import AddClient from "./pages/client/addClient/AddClient";
import ShowClient from "./pages/client/showClient/ShowClient";
import ShowReceipt from "./pages/addReceipt/ShowReceipt";
import EditReceipt from "./pages/editReceipt/EditReceipt";
import EditClient from "./pages/client/editClient/EditClient";
import ClientDetail from "./components/client/clientDetail/ClientDetail"
import AddTask from "./pages/addTask/AddTask";
import ShowTask from "./pages/task/ShowTask";
import EditTask from "./pages/task/EditTask";
import TaskDetail from "./components/task/taskDetail/TaskDetail";

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
        <Route path="/add-task" element={
          <Sidebar>
            <Layout>
              <AddTask/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/show-task" element={
          <Sidebar>
            <Layout>
              <ShowTask/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/edit-task/:id" element={
          <Sidebar>
            <Layout>
              <EditTask/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/task-detail/:id" element={
          <Sidebar>
            <Layout>
              <TaskDetail/>
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
        <Route path="/add-receipt/:id" element={
          <Sidebar>
            <Layout>
              <AddReceipt/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/show-receipt" element={
          <Sidebar>
            <Layout>
              <ShowReceipt/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/edit-receipt/:id" element={
          <Sidebar>
            <Layout>
              <EditReceipt/>
            </Layout>
          </Sidebar>
        }/>

        
        <Route path="/show-material" element={
          <Sidebar>
            <Layout>
              <ShowMaterial/>
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
        <Route path="/add-client" element={
          <Sidebar>
            <Layout>
              <AddClient/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/edit-client/:id" element={
          <Sidebar>
            <Layout>
              <EditClient/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/show-client" element={
          <Sidebar>
            <Layout>
              <ShowClient/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/client-detail/:id" element={
          <Sidebar>
            <Layout>
              <ClientDetail/>
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
