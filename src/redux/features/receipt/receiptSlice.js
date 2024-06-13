import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import receiptService from "./receiptService"
import {toast} from "react-toastify"

const initialState = {
    receipt: null,
    receipts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//create new receipt
export const createReceipt = createAsyncThunk(
    "receipt/create",
    async ({ materialId, formData }, thunkAPI) =>{
        try{
return await receiptService.createReceipt(materialId, formData)
        } catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                toast.error(message)
                console.log(message);
                return thunkAPI.rejectWithValue(message)
        }
    }
)
//get receipt
export const getReceipt = createAsyncThunk(
    "receipt/getReceipt",
    async (materialId, thunkAPI) =>{
        try{
return await receiptService.getReceipt(materialId)
        } catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                toast.error(message)
                console.log(message);
                return thunkAPI.rejectWithValue(message)
        }
    }
)
//Get single receipt
export const getSingleReceipt = createAsyncThunk(
  "receipt/getSingleReceipt",
  async(id, thunkAPI)=>{
    try{
      return await receiptService.getSingleReceipt(id)
    } catch(error){
      const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message)
        console.log(message);
        return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get all receipts
export const getReceipts = createAsyncThunk(
  "receipts/getAll",
  async (_, thunkAPI) => {
    try {
      return await receiptService.getReceipts();
      
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

//Update receipt
export const updateReceipt = createAsyncThunk(
  "receipt/updateReceipt",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await receiptService.updateReceipt(id, formData);
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

//Delete receipt
export const deleteReceipt = createAsyncThunk(
  "receipt/delete",
  async(id, thunkAPI)=>{
    try{
      return await receiptService.deleteReceipt(id)
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


const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    CALC_TOTAL(state, action){
        console.log("Total")
    }
  },

  extraReducers:(builder)=>{
builder
.addCase(createReceipt.pending, (state)=>{
    state.isLoading= true
})
.addCase(createReceipt.fulfilled, (state, action) => {
    state.isLoading= false;
    state.isSuccess = true;
    console.log(action.payload); 
    state.receipts.push(action.payload);
    toast.success("Receipt added success");
})
.addCase(createReceipt.rejected, (state, action)=>{
    state.isLoading= false;
    state.isError = true;
    state.message = action.payload;
   
    toast.error(action.payload);
})
.addCase(getReceipt.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(getReceipt.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.receipts = action.payload;
  })
  .addCase(getReceipt.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  })
  .addCase(getReceipts.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(getReceipts.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    console.log(action.payload);
    state.receipts = action.payload;
  })
  .addCase(getReceipts.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  })
  .addCase(getSingleReceipt.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(getSingleReceipt.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
  
    state.receipt = action.payload;
  })
  .addCase(getSingleReceipt.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  })
  .addCase(updateReceipt.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(updateReceipt.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    toast.success("Reciept updated successfully");
  })
  .addCase(updateReceipt.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  })
  .addCase(deleteReceipt.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(deleteReceipt.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    toast.success("Receipt deleted successfully");
  })
  .addCase(deleteReceipt.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  })
  }
});


export const {CALC_TOTAL} = receiptSlice.actions
export const selectIsLoading = (state) => state.receipt.isLoading || [];
export const selectReceipt = (state) => state.receipt.receipt;
export const selectReceiptId = (state) => state.receipt._id;
export default receiptSlice.reducer