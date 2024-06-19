import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import materialReducer from "../redux/features/material/materialSlice";
import filterReducer from "../redux/features/material/filterSlice";
import receiptReducer from "../redux/features/receipt/receiptSlice"
import clientReducer from "../redux/features/client/clientSlice"
import taskReducer from "../redux/features/task/TaskSlice"
import deliveryReducer from "../redux/features/delivery/deliverySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    material: materialReducer,
    filter: filterReducer,
    receipt: receiptReducer,
    client: clientReducer,
    task: taskReducer,
    delivery: deliveryReducer,
  },
});