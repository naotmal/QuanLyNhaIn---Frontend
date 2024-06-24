import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import dojobService from './DoJobService';


const initialState={
    dojob: null,
    dojobs: [],
    isError: false,
    isSuccess:false,
    isLoading: false,
    message:""
}

//create new do job
export const createDoJob = createAsyncThunk(
    "dojob/create",
    async({deliveryId, formData}, thunkAPI)=>{
        try {
            return await dojobService.createDoJob(deliveryId, formData)
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

//get all do job
export const getDoJobs = createAsyncThunk(
    "dojob/getAll",
    async(_, thunkAPI)=>{
        try {
            return await dojobService.getDoJobs()
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

//get single do job
export const getDoJob = createAsyncThunk(
  "dojob/getDoJob",
  async(id, thunkAPI)=>{
      try {
          return await dojobService.getDoJob(id)
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

//get do jobs by task
export const getDoJobsbyTask = createAsyncThunk(
    "dojob/getJobbyTask",
    async(taskId, thunkAPI)=>{
        try {
            return await dojobService.getDoJobsbyTask(taskId)
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

//Delete dojob
export const deleteDoJob = createAsyncThunk(
    "dojob/deleteDoJob",
    async (id, thunkAPI) => {
      try {
        return await dojobService.deleteDoJob(id)
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

  //update dojob
export const updateDoJob = createAsyncThunk(
  "dojob/updateDoJob",
  async ({id, formData}, thunkAPI) => {
    try {
      return await dojobService.updateDoJob(id, formData)
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



const dojobSlice = createSlice({
    name: "dojob",
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(createDoJob.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createDoJob.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.dojobs.push(action.payload);
            toast.success("Do job added successfully")
        })
        .addCase(createDoJob.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
          
            toast.error(action.payload)
        })
        .addCase(getDoJobs.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getDoJobs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.dojobs.push(action.payload);
          
        })
        .addCase(getDoJobs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
          
            toast.error(action.payload)
        })
        .addCase(getDoJob.pending, (state)=>{
          state.isLoading = true
      })
      .addCase(getDoJob.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.dojob = action.payload;
        
      })
      .addCase(getDoJob.rejected, (state, action)=>{
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
        
          toast.error(action.payload)
      })
        .addCase(getDoJobsbyTask.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getDoJobsbyTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.dojobs = action.payload;
          })
          .addCase(getDoJobsbyTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(deleteDoJob.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteDoJob.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Do Job deleted successfully");
          })
          .addCase(deleteDoJob.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(updateDoJob.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateDoJob.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Do job updated successfully");
          })
          .addCase(updateDoJob.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          });
    
    }
})

export const selectIsLoading = (state) => state.dojob.isLoading
export const selectDoJob = (state) => state.dojob.dojob
export default dojobSlice.reducer