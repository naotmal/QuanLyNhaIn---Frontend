import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobService from "./JobService";
import { toast } from 'react-toastify';

const initialState={
    job:null,
    jobs:[],
    isError: false,
    isSuccess:false,
    isLoading: false,
    message:""
}

//create new job
export const createJob = createAsyncThunk(
    "jobs/create",
    async(formData, thunkAPI) =>{
        try{
            return await jobService.createJob(formData)
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

//Get all jobs
export const getJobs = createAsyncThunk(
    "jobs/getAll",
    async(_, thunkAPI)=>{
        try{
            return await jobService.getJobs()
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

//Delete job
export const deleteJob = createAsyncThunk(
    "jobs/delete",
    async(id, thunkAPI)=>{
      try{
        return await jobService.deleteJob(id)
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

  // Update job
export const updateJob = createAsyncThunk(
    "jobs/updateJob",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await jobService.updateJob(id, formData)
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
  );

  //Get job
export const getJob = createAsyncThunk(
    "jobs/getJob",
    async(id, thunkAPI) =>{
      try {
        return await jobService.getJob(id)
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

const jobSlice = createSlice({
    name: "job",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(createJob.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createJob.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.jobs.push(action.payload);
            toast.success("Job added successfully")
        })
        .addCase(createJob.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
          
            toast.error(action.payload)
        })
        .addCase(getJobs.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getJobs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.jobs = action.payload;
          })
          .addCase(getJobs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(deleteJob.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteJob.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Job deleted successfully");
          })
          .addCase(deleteJob.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(updateJob.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateJob.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Job updated successfully");
          })
          .addCase(updateJob.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(getJob.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getJob.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.job = action.payload;
          })
          .addCase(getJob.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
    }
})

export const selectIsLoading = (state) => state.job.isLoading
export const selectJob = (state) => state.job.job
export const selectJobs = (state) => state.job.jobs
export const selectJobId = (state) => state.job._id
export const selectJobName = (state) => state.job.name

export default jobSlice.reducer