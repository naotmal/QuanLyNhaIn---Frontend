import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMaterials: [],
  filteredClients: [],
  filteredReceipts: [],
  filteredTasks: [],
  filteredDeliveries: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { materials, search } = action.payload;
      const tempMaterials = materials.filter((material) => {
        const nameMatch = typeof material.name === 'string' && material.name.toLowerCase().includes(search.toLowerCase());
        const categoryMatch = typeof material.category === 'string' && material.category.toLowerCase().includes(search.toLowerCase());
        return nameMatch || categoryMatch;
      });

      state.filteredMaterials = tempMaterials;
    },
    FILTER_CLIENTS(state, action) {
      const { clients, search } = action.payload;
      const tempClients = clients.filter((client) => {
        const nameMatch = typeof client.name === 'string' && client.name.toLowerCase().includes(search.toLowerCase());
        const emailMatch = typeof client.email === 'string' && client.email.toLowerCase().includes(search.toLowerCase());
        const phoneMatch = typeof client.phone === 'string' && client.phone.toLowerCase().includes(search.toLowerCase());
        const addressMatch = typeof client.address === 'string' && client.address.toLowerCase().includes(search.toLowerCase());
        return nameMatch || emailMatch || phoneMatch || addressMatch;
      });

      state.filteredClients = tempClients;
    },
    FILTER_RECEIPTS(state, action) {
      const { receipts, search } = action.payload;
      const tempReceipts = receipts.filter((receipt) => {
        const quantityMatch = typeof receipt.quantity === 'string' && receipt.quantity.toLowerCase().includes(search.toLowerCase());
        const createAtMatch = typeof receipt.createAt === 'string' && receipt.createAt.toLowerCase().includes(search.toLowerCase());
        return quantityMatch || createAtMatch;
      });

      state.filteredReceipts = tempReceipts;
    },
    FILTER_TASKS(state, action) {
      const { tasks, search } = action.payload;
      const tempTasks = tasks.filter((task) => {
        return typeof task.quantity === 'string' && task.quantity.toLowerCase().includes(search.toLowerCase());
      });

      state.filteredTasks = tempTasks;
    },
    FILTER_DELIVERIES(state, action) {
      const { deliveries, search } = action.payload;
      const tempDeliveries = deliveries.filter((delivery) => {
        return typeof delivery.quantity === 'string' && delivery.quantity.toLowerCase().includes(search.toLowerCase());
      });

      state.filteredDeliveries = tempDeliveries;
    },
  },
});

export const { FILTER_PRODUCTS, FILTER_CLIENTS, FILTER_RECEIPTS, FILTER_TASKS, FILTER_DELIVERIES } = filterSlice.actions;

export const selectFilteredMaterials = (state) => state.filter.filteredMaterials;
export const selectFilteredClients = (state) => state.filter.filteredClients || [];
export const selectFilteredReceipts = (state) => state.filter.filteredReceipts || [];
export const selectFilteredTasks = (state) => state.filter.filteredTasks || [];
export const selectFilteredDeliveries = (state) => state.filter.filteredDeliveries || [];

export default filterSlice.reducer;
