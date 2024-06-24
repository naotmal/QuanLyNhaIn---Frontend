import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from "../../../services/authService"
import {toast} from "react-toastify"

const name = JSON.parse(localStorage.getItem("name"))
const role = JSON.parse(localStorage.getItem("role"))


const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
 
  user:{
    name:"",
    email:"",
    phone:"",
    photo:"",
    role:role? role:"",
  },
  users:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:"",
}

//Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async(userData, thunkAPI)=>{
    try {
      return await authService.registerUser(userData)
    } catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//get user
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async(_, thunkAPI)=>{
    try {
      return await authService.getUsers()
    } catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async(id, thunkAPI)=>{
    try {
      return await authService.deleteUser(id)
    } catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//upgrade user
export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async(userData, thunkAPI)=>{
    try {
      return await authService.upgradeUser(userData)
    } catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state){
      state.isError= false;
  state.isSuccess= false;
  state.isLoading= false;
  state.message="";
    },
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    SET_ROLE(state, action) {
      localStorage.setItem("role", JSON.stringify(action.payload))
      state.role = action.payload
    },
    SET_USER(state, action) {
      const profile = action.payload
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.photo = profile.photo;
      state.user.role = profile.role
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(registerUser.pending, (state, action)=>{
      state.isLoading= true;
    })
    .addCase(registerUser.fulfilled, (state, action)=>{
      state.isLoading= false;

      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload)
      toast.success("Register successful")

    })
    .addCase(registerUser.rejected, (state, action)=>{
      state.isLoading= false;

      state.isError = true;
      state.message= action.payload;
      state.user = null;
      toast.success(action.payload)

    })
    .addCase(getUsers.pending, (state, action)=>{
      state.isLoading= true;
    })
    .addCase(getUsers.fulfilled, (state, action)=>{
      state.isLoading= false;

      state.isSuccess = true;
  
      state.users = action.payload;
    
     

    })
    .addCase(getUsers.rejected, (state, action)=>{
      state.isLoading= false;

      state.isError = true;
      state.message= action.payload;
     
      toast.success(action.payload)

    })
    .addCase(deleteUser.pending, (state, action)=>{
      state.isLoading= true;
    })
    .addCase(deleteUser.fulfilled, (state, action)=>{
      state.isLoading= false;

      state.isSuccess = true;
  
      state.message = action.payload;
      toast.success(action.payload)
    
     

    })
    .addCase(deleteUser.rejected, (state, action)=>{
      state.isLoading= false;

      state.isError = true;
      state.message= action.payload;
     
      toast.success(action.payload)

    })
    .addCase(upgradeUser.pending, (state, action)=>{
      state.isLoading= true;
    })
    .addCase(upgradeUser.fulfilled, (state, action)=>{
      state.isLoading= false;

      state.isSuccess = true;
  
      state.message = action.payload;
      toast.success(action.payload)
    
     

    })
    .addCase(upgradeUser.rejected, (state, action)=>{
      state.isLoading= false;

      state.isError = true;
      state.message= action.payload;
     
      toast.success(action.payload)

    })
  }
});

export const {RESET, SET_LOGIN, SET_NAME, SET_USER, SET_ROLE } = authSlice.actions

export const selectIsLoggedin = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user



export default authSlice.reducer