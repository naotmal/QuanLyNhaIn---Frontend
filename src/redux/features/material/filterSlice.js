import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMaterials: [],
  filteredClients: [],
  filteredReceipts: [],
  filteredTasks: [],
  filteredDeliveries: [],
  filteredJobs: [],
  filteredDoJobs: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_MATERIALS(state, action) {
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
        return typeof task.name === 'string' && task.name.toLowerCase().includes(search.toLowerCase());
      });

      state.filteredTasks = tempTasks;
    },
   
    FILTER_DELIVERIES(state, action) {
      const { deliveries, search } = action.payload;
      const tempDeliveries = deliveries.filter((delivery) => {
        const quantityMatch = typeof delivery.quantity === 'string' && delivery.quantity.toLowerCase().includes(search.toLowerCase());
        const createAtMatch = typeof delivery.createAt === 'string' && delivery.createAt.toLowerCase().includes(search.toLowerCase());
        return quantityMatch || createAtMatch;
      });

      state.filteredDeliveries = tempDeliveries;
    },
    FILTER_JOBS(state, action) {
      const { jobs, search } = action.payload;
      const tempJobs = jobs.filter((job) => {
        const nameMatch = typeof job.name === 'string' && job.name.toLowerCase().includes(search.toLowerCase());
        const priceMatch = typeof job.price === 'string' && job.price.toLowerCase().includes(search.toLowerCase());
        return nameMatch || priceMatch;
      });

      state.filteredJobs = tempJobs;
    },
    FILTER_DOJOBS(state, action) {
      const { dojobs, search } = action.payload;
      const tempDoJobs = dojobs.filter((dojob) => {
        const jobMatch = typeof dojob.jobId === 'string' && dojob.jobId.toLowerCase().includes(search.toLowerCase());
        const deliveryMatch = typeof dojob.deliveryId === 'string' && dojob.deliveryId.toLowerCase().includes(search.toLowerCase());
        return jobMatch || deliveryMatch;
      });

      state.filteredDoJobs = tempDoJobs;
    },
  },
});

export const { FILTER_MATERIALS, FILTER_CLIENTS, FILTER_RECEIPTS, FILTER_TASKS, FILTER_DELIVERIES,FILTER_JOBS,FILTER_DOJOBS } = filterSlice.actions;

export const selectFilteredMaterials = (state) => state.filter.filteredMaterials;
export const selectFilteredClients = (state) => state.filter.filteredClients || [];
export const selectFilteredReceipts = (state) => state.filter.filteredReceipts || [];
export const selectFilteredTasks = (state) => state.filter.filteredTasks || [];
export const selectFilteredDeliveries = (state) => state.filter.filteredDeliveries || [];
export const selectFilteredJobs = (state) => state.filter.filteredJobs || [];
export const selectFilteredDoJobs = (state) => state.filter.filteredDoJobs || []
export default filterSlice.reducer;
