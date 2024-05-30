import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import materialReducer from "../redux/features/material/materialSlice";
import filterReducer from "../redux/features/material/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    material: materialReducer,
    filter: filterReducer,
  },
});