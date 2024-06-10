import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clientService from './clientServer';
import { toast } from 'react-toastify';

const initialState = {
    client: null,
    clients: [],
    isError: false,
    isSuccess:false,
    isLoading: false,
    message:""
};

//Create new client
export const createClient = createAsyncThunk(
    "clients/create",
    async( FormData, thunkAPI) =>{
        try {
            return await clientService.createClient(FormData)
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

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    CALC_CLIENT_VALUE(state, action) {
        console.log("client value");
    }
  },
  extraReducers: (builder) => {
builder
.addCase(createClient.pending, (state)=>{
    state.isLoading = true
})
.addCase(createClient.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    console.log(action.payload);
    state.clients.push(action.payload);
    toast.success("Client added successfully")
})
.addCase(createClient.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload
  
    toast.error(action.payload)
})
  }
});

export const {CALC_CLIENT_VALUE} = clientSlice.actions


export const selectIsLoading = (state) => state.client.isLoading
export default clientSlice.reducer