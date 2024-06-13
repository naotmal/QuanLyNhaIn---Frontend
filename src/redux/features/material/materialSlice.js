import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import materialService from "./materialService";
import { toast } from "react-toastify";

const initialState = {
  material: null,
  materials: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Material
export const createMaterial = createAsyncThunk(
  "materials/create",
  async (formData, thunkAPI) => {
    try {
      return await materialService.createMaterial(formData);
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

// Get all materials
export const getMaterials = createAsyncThunk(
  "materials/getAll",
  async (_, thunkAPI) => {
    try {
      return await materialService.getMaterials();
      
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

// Delete a Material
export const deleteMaterial = createAsyncThunk(
  "materials/delete",
  async (id, thunkAPI) => {
    try {
      return await materialService.deleteMaterial(id);
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

// Get a material
export const getMaterial = createAsyncThunk(
  "materials/getMaterial",
  async (id, thunkAPI) => {
    try {
      return await materialService.getMaterial(id);
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
// Update material
export const updateMaterial = createAsyncThunk(
  "materials/updateMaterial",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await materialService.updateMaterial(id, formData);
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



const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const materials = action.payload;
      const array = [];
      materials.map((item) => {
        const { price, quantity } = item;
        const materialValue = price * quantity;
        return array.push(materialValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const materials = action.payload;
      const array = [];
      materials.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const materials = action.payload;
      const array = [];
      materials.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.materials.push(action.payload);
        toast.success("Material added successfully");
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMaterials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.materials = action.payload;
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Material deleted successfully");
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.material = action.payload;
      })
      .addCase(getMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Material updated successfully");
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });

      
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  materialSlice.actions;

export const selectIsLoading = (state) => state.material.isLoading;
export const selectMaterial = (state) => state.material.material;
export const selectName = (state) => state.material.material?.name;
export const selectTotalStoreValue = (state) => state.material.totalStoreValue;
export const selectOutOfStock = (state) => state.material.outOfStock;
export const selectCategory = (state) => state.material.category;

export default materialSlice.reducer;