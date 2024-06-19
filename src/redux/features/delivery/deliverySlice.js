import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import deliveryService from './deliveryService';
import { toast } from 'react-toastify';

const initialState={
    delivery: null,
    deliveries: [],
    isError: false,
    isSuccess:false,
    isLoading: false,
    message:""
}

// create new delivery
export const createDelivery = createAsyncThunk(
    "delivery/create",
    async({taskId, formData}, thunkAPI)=>{
        try{
            return await deliveryService.createDelivery(taskId, formData)
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

//Get delivery bye material
export const getDeliverybyMaterial = createAsyncThunk(
    "delivery/getDeliverybyMaterial",
    async(materialId, thunkAPI)=>{
        try{
            return await deliveryService.getDeliverybyMaterial(materialId)
        } catch(error){
            const message =( 
                error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                toast.error(message)
                console.log(message);
                return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get delivery bye task
export const getDeliverybyTask = createAsyncThunk(
    "delivery/getDeliverybyTask",
    async(taskId, thunkAPI)=>{
        try{
            return await deliveryService.getDeliverybyTask(taskId)
        } catch(error){
            const message =( 
                error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                toast.error(message)
                console.log(message);
                return thunkAPI.rejectWithValue(message)
        }
    }
)
//Get single delivery
export const getSingleDelivery = createAsyncThunk(
  "delivery/getSingleDelivery",
  async(id, thunkAPI)=>{
    try{
      return await deliveryService.getSingleDelivery(id)
    } catch(error){
      const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message)
        console.log(message);
        return thunkAPI.rejectWithValue(message)
    }
  }
)

//Delete delivery
export const deleteDelivery = createAsyncThunk(
    "delivery/delete",
    async(id, thunkAPI)=>{
        try {
            return await deliveryService.deleteDelivery(id)
        } catch (error) {
            const message=
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

//Update delivery
export const updateDelivery = createAsyncThunk(
    "delivery/updateDelivery",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await deliveryService.updateDelivery(id, formData);
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

  // Get all deliveries
export const getDeliveries = createAsyncThunk(
  "delivery/getAll",
  async (_, thunkAPI) => {
    try {
      return await deliveryService.getDeliveries()
      
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

const deliverySlice = createSlice({
    name:"delivery",
    initialState,
    reducers:{
        CALC_DELIVERY(state, action){
            console.log("delivery value");
        }
    },
    extraReducers: (builder) =>{
        builder

    .addCase(createDelivery.pending, (state)=>{
        state.isLoading = true
    })
    .addCase(createDelivery.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.deliveries.push(action.payload);
        toast.success("Delivery added successfully")
    })
    .addCase(createDelivery.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      
        toast.error(action.payload)
    })
    .addCase(getDeliverybyMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeliverybyMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deliveries = action.payload;
      })
      .addCase(getDeliverybyMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getDeliverybyTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeliverybyTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deliveries = action.payload;
      })
      .addCase(getDeliverybyTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSingleDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.delivery = action.payload;
      })
      .addCase(getSingleDelivery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Delivery deleted successfully");
      })
      .addCase(deleteDelivery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Delivery updated successfully");
      })
      .addCase(updateDelivery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getDeliveries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeliveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.deliveries = action.payload;
      })
      .addCase(getDeliveries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
    }
})

export const {CALC_DELIVERY} = deliverySlice.actions

export const selectIsLoading = (state) => state.delivery.isLoading;
export const selectClient = (state) => state.delivery.deliveries;
export const selectDelivery = (state) => state.delivery.delivery;
export const selectDeliveryTask = (state) => state.delivery.taskId;

export default deliverySlice.reducer