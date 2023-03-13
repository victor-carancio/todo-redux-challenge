import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import {
  loadingDimiss,
  loadingToast,
  loadingToErrorToast,
  loadingToSuccess,
} from "components/Toast";

const url =
  "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/";

const initialState = {
  todosList: [],
  todosChecked: 0,
};

export const getTodosList = createAsyncThunk(
  "todos/getTodosList",
  async (action, { rejectWithValue }) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(url, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/patchTodo",
  async (action, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${url}${action.id}`, {
        checked: action.checked,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${url}${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    totalDone: (state) => {
      state.todosChecked = state.todosList.filter(
        (todo) => todo.checked === true
      ).length;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get To do's
      .addCase(getTodosList.pending, (state) => {
        loadingToast("Loading To Do list...");
      })
      .addCase(getTodosList.fulfilled, (state, action) => {
        state.todosList = action.payload;
        loadingDimiss();
      })
      .addCase(getTodosList.rejected, (state) => {
        loadingToErrorToast("Loading To Do list has failed");
      })
      //Post To do
      .addCase(createTodo.pending, (state) => {
        loadingToast("Adding To Do...");
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.todosList.push(payload);
        loadingToSuccess("To do has been added");
      })
      .addCase(createTodo.rejected, (state) => {
        loadingToErrorToast("Add To do has failed");
      })
      //Update To do
      .addCase(updateTodo.pending, (state) => {
        loadingToast("Updating To Do...");
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todo = state.todosList.find(
          (item) => item.id === action.meta.arg.id
        );

        todo.checked = action.meta.arg.checked;
        loadingToSuccess("To do has been updated");
      })
      .addCase(updateTodo.rejected, (state) => {
        loadingToErrorToast("Update To do has failed");
      })
      //Delete To do
      .addCase(deleteTodo.pending, (state) => {
        loadingToast("Removing To do...");
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todosList = state.todosList.filter(
          (item) => item.id !== action.meta.arg
        );
        loadingToSuccess("To do has been Removed");
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        loadingToErrorToast("Remove To do has failed");
      });
  },
});

export const { todoToggleCheck, totalDone } = todoSlice.actions;

export default todoSlice.reducer;
