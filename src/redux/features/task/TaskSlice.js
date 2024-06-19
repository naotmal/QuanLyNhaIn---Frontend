import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import taskService from './TaskService';


const initialState = {
  task: null,
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  notstartProgress: 0,
  todoProgress: 0,
  doingProgress: 0,
  doneProgress: 0,
};


//Create new task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (formData, thunkAPI) => {
    try {
      return await taskService.createTask(formData)
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

//Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      return await taskService.deleteTask(id)
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

//get all tasks
export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      return await taskService.getTasks()
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
//get single task
export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (taskId, thunkAPI) => {
    try {
      return await taskService.getTask(taskId)
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

//get task by client
export const getTaskbyClient = createAsyncThunk(
  "tasks/getTaskbyClient",
  async (clientId, thunkAPI) => {
    try {
      return await taskService.getTaskbyClient(clientId)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      toast.error(message)
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await taskService.updateTask(id, formData)
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

//change progress
export const changeProgress = createAsyncThunk(
  "tasks/changeprogress",
  async (taskData, thunkAPI) => {
    try {
      return await taskService.changeProgress(taskData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    CALC_NOT_START(state, action) {
      const tasks = action.payload;
      const array = [];
      tasks.map((item) => {
        const { progress } = item;
        return array.push(progress)
      })
      let count = 0;
      array.forEach((progress) => {
        if (progress === "1" || progress === 1) {
          count += 1
        }
      })
      state.notstartProgress = count;
    },
    CALC_TO_DO(state, action) {
      const tasks = action.payload;
      const array = [];
      tasks.map((item) => {
        const { progress } = item;
        return array.push(progress)
      })
      let count = 0;
      array.forEach((progress) => {
        if (progress === "2" || progress === 2) {
          count += 1
        }
      })
      state.todoProgress = count;
    },
    CALC_DOING(state, action) {
      const tasks = action.payload;
      const array = [];
      tasks.map((item) => {
        const { progress } = item;
        return array.push(progress)
      })
      let count = 0;
      array.forEach((progress) => {
        if (progress === "3" || progress === 3) {
          count += 1
        }
      })
      state.doingProgress = count;
    },
    CALC_DONE(state, action) {
      const tasks = action.payload;
      const array = [];
      tasks.map((item) => {
        const { progress } = item;
        return array.push(progress)
      })
      let count = 0;
      array.forEach((progress) => {
        if (progress === "4" || progress === 4) {
          count += 1
        }
      })
      state.doneProgress = count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.tasks.push(action.payload);
        toast.success("Client added successfully")
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload

        toast.error(action.payload)
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Task deleted successfully");
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTaskbyClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskbyClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.tasks = action.payload;
      })
      .addCase(getTaskbyClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Task updated successfully");
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(changeProgress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changeProgress.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isSuccess = true;

        state.message = action.payload;
        toast.success(action.payload)



      })
      .addCase(changeProgress.rejected, (state, action) => {
        state.isLoading = false;

        state.isError = true;
        state.message = action.payload;

        toast.success(action.payload)

      })
  }
});

export const { CALC_NOT_START, CALC_TO_DO, CALC_DOING, CALC_DONE } = taskSlice.actions;
export const selectNotStart = (state) => state.task.notstartProgress;
export const selectToDo = (state) => state.task.todoProgress;
export const selectDoing = (state) => state.task.doingProgress;
export const selectDone = (state) => state.task.doneProgress;
export const selectIsLoading = (state) => state.task.isLoading;
export const selectTask = (state) => state.task.task;
export const selectName = (state) => state.task.task?.name;
export default taskSlice.reducer