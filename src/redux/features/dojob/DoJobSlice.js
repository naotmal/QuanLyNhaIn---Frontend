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

//create new do job
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
    }
})

export const selectIsLoading = (state) => state.dojob.isLoading
export default dojobSlice.reducer