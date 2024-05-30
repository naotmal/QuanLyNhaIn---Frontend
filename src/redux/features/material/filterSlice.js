import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMaterials: [],
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
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredMaterials =(state) => state.filter.filteredMaterials;

export default filterSlice.reducer;