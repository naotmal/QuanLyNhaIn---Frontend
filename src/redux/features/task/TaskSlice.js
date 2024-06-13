import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import taskService from './TaskService';


const initialState = {
    task: null,
    tasks: [],
    isError: false,
    isSuccess:false,
    isLoading: false,
    message:""
};


//Create new task
export const createTask = createAsyncThunk(
    "tasks/create",
    async(formData, thunkAPI) =>{
        try {
            return await taskService.createTask(formData)
        } catch (error) {
            const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }}
)

//Delete task
export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async(id, thunkAPI)=>{
        try{
          return await taskService.deleteTask(id)
        }catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          return thunkAPI.rejectWithValue(message);
        }
      }
)

//get all tasks
export const getTasks = createAsyncThunk(
    "tasks/getAll",
    async(_, thunkAPI)=>{
      try {
        return await taskService.getTasks()
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
      }
    }
  )
  
  export const getTask = createAsyncThunk(
    "tasks/getTask",
    async(id, thunkAPI) =>{
      try {
        return await taskService.getTask(id)
      }catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  )

  //update task
  export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async({id, formData}, thunkAPI) =>{
      try {
        return await taskService.updateTask(id, formData)
      }catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  )


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers:{
        CALC_TASK(state, actioin){
            console.log("task total")
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createTask.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createTask.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.tasks.push(action.payload);
            toast.success("Client added successfully")
        })
        .addCase(createTask.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
          
            toast.error(action.payload)
        })
        .addCase(deleteTask.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Task deleted successfully");
          })
          .addCase(deleteTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(getTasks.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.tasks = action.payload;
          })
          .addCase(getTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(getTask.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.task = action.payload;
          })
          .addCase(getTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(updateTask.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Task updated successfully");
          })
          .addCase(updateTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          });
    }
});
export const selectIsLoading = (state) => state.task.isLoading;
export const selectTask = (state) => state.task.task;
export default taskSlice.reducer