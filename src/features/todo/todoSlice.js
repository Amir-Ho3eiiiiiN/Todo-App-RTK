import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3001", // آدرس پایه
});

export const getAsyncTodos = createAsyncThunk(
  "user/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", {
        title: payload.title,
        id: Date.now().toString(),
        completed: false,
        date: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodo = createAsyncThunk(
  "todos/toggleAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${payload.id}`, {
        completed: payload.completed,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  todos: [],
  error: false,
  errorMessage: "",
  loading: false,
  sort: false,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = false;
  state.errorMessage = "";
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.todos = action.payload;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage =
    action.payload || action.error.message || "Unknown error occurred";
  toast.error(state.errorMessage);
};

const handleAddTodoFulfilled = (state, action) => {
  state.loading = false;
  state.todos.push(action.payload);
};

const handleDeleteTodoFulfilled = (state, action) => {
  state.loading = false;
  state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
};

const handleToggleTodoFulfilled = (state, action) => {
  state.loading = false;
  const selectedTodo = state.todos.find(
    (todo) => todo.id === action.payload.id
  );
  if (selectedTodo) {
    selectedTodo.completed = action.payload.completed;
  }
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    sortTodos: (state, action) => {
      if (action.payload)
        state.todos = state.todos.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      else
        state.todos = state.todos.sort(
          (b, a) => new Date(a.date) - new Date(b.date)
        );
      state.sort = action.payload;
    },
    filterTodos: (state, action) => {
      if (action.payload)
        state.todos = state.todos.sort((a, b) => a.completed - b.completed);
      else state.todos = state.todos.sort((a, b) => b.completed - a.completed);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, handlePending)
      .addCase(getAsyncTodos.fulfilled, handleFulfilled)
      .addCase(getAsyncTodos.rejected, handleRejected)

      .addCase(addAsyncTodo.pending, handlePending)
      .addCase(addAsyncTodo.fulfilled, handleAddTodoFulfilled)
      .addCase(addAsyncTodo.rejected, handleRejected)

      .addCase(deleteAsyncTodo.pending, handlePending)
      .addCase(deleteAsyncTodo.fulfilled, handleDeleteTodoFulfilled)
      .addCase(deleteAsyncTodo.rejected, handleRejected)

      .addCase(toggleAsyncTodo.pending, handlePending)
      .addCase(toggleAsyncTodo.fulfilled, handleToggleTodoFulfilled)
      .addCase(toggleAsyncTodo.rejected, handleRejected);
  },
});

export const { sortTodos, filterTodos } = todoSlice.actions;
export default todoSlice.reducer;
