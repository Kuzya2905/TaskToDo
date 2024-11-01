import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  deleted: boolean;
};

type ToDoState = {
  tasks: Task[];
  isLoggedIn: boolean;
};

const loadSavedTasks = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const loadStatusLogin = (): boolean =>
  localStorage.getItem("loggedIn") === "true";

const initialState: ToDoState = {
  isLoggedIn: loadStatusLogin(),
  tasks: loadSavedTasks(),
};

const toDoSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("loggedIn", "true");
    },

    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: new Date().toISOString(),
        text: action.payload,
        completed: false,
        deleted: false,
      });
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.deleted = true;
    },

    clearTasks: (state) => {
      state.tasks = [];
    },

    toggleCompleteTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },

    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  login,
  addTask,
  deleteTask,
  clearTasks,
  toggleCompleteTask,
  setTasks,
} = toDoSlice.actions;

export default toDoSlice.reducer;
