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
    async (id, thunkAPI) =>{
        try{
return await receiptService.getReceipt(id)
        } catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                toast.error(message)
                console.log(message);
                return thunkAPI.rejectWithValue(message)
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
    state.material = action.payload;
  })
  .addCase(getReceipt.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  })
  }
});

export const {CALC_TOTAL} = receiptSlice.actions
export const selectIsLoading = (state) => state.receipt.isLoading;
export default receiptSlice.reducer