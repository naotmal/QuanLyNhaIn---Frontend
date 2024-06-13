import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMaterials: [],
  filteredClients: [],
  filteredReceipts: [],
  filteredTasks: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { materials, search } = action.payload;
      const tempMaterials = materials.filter(
        (material) =>
          material.name.toLowerCase().includes(search.toLowerCase()) ||
          material.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredMaterials = tempMaterials;
    },
    FILTER_CLIENTS(state, action) {
      const { clients, search } = action.payload;
      const tempClients = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase()) ||
          client.phone.toLowerCase().includes(search.toLowerCase()) ||
          client.address.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredClients = tempClients;
    },
    FILTER_RECEIPTS(state, action) {
      const { receipts, search } = action.payload;
      const tempReceipt = receipts.filter(
        (receipt) =>
          receipt.quantity.toLowerCase().includes(search.toLowerCase()) ||
          receipt.createAt.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredReceipts = tempReceipt;
    },
    FILTER_TASKS(state, action) {
      const { tasks, search } = action.payload;
      const tempTask = tasks.filter(
        (task) =>
          task.quantity.toLowerCase().includes(search.toLowerCase()) ||
          task.createAt.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredTasks = tempTask;
    },
  },
});

export const { FILTER_PRODUCTS,  FILTER_CLIENTS, FILTER_RECEIPTS, FILTER_TASKS} = filterSlice.actions;

export const selectFilteredMaterials =(state) => state.filter.filteredMaterials;
export const selectFilteredClients =(state) => state.filter.filteredClients || [];
export const selectFilteredReceipts =(state) => state.filter.filteredReceipts || [];
export const selectFilteredTasks = (state) => state.filter.filteredTasks || []

export default filterSlice.reducer;