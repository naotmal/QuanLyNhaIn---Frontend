import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clientService from './clientService';
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

//get all clients
export const getClients = createAsyncThunk(
  "clients/getAll",
  async(_, thunkAPI)=>{
    try {
      return await clientService.getClients()
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

//Get client
export const getClient = createAsyncThunk(
  "clients/getClient",
  async(id, thunkAPI) =>{
    try {
      return await clientService.getClient(id)
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

//Delete client
export const deleteClient = createAsyncThunk(
  "clients/delete",
  async(id, thunkAPI)=>{
    try{
      return await clientService.deleteClient(id)
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

// Update client
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await clientService.updateClient(id, formData)
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
.addCase(getClients.pending, (state) => {
  state.isLoading = true;
})
.addCase(getClients.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  console.log(action.payload);
  state.clients = action.payload;
})
.addCase(getClients.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(deleteClient.pending, (state) => {
  state.isLoading = true;
})
.addCase(deleteClient.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  toast.success("Client deleted successfully");
})
.addCase(deleteClient.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(getClient.pending, (state) => {
  state.isLoading = true;
})
.addCase(getClient.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  state.client = action.payload;
})
.addCase(getClient.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(updateClient.pending, (state) => {
  state.isLoading = true;
})
.addCase(updateClient.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  toast.success("Client updated successfully");
})
.addCase(updateClient.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
  }
});

export const {CALC_CLIENT_VALUE} = clientSlice.actions


export const selectIsLoading = (state) => state.client.isLoading;
export const selectClient = (state) => state.client.client;
export const selectClients = (state) => state.client.clients;

export const selectClientId = (state) => state.client._id;
export default clientSlice.reducer