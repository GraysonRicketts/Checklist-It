import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../api/models/Task.model';
import { AppThunk } from '.';
import { getTasks } from '../api';

interface TasksState {
  isLoading: boolean;
  currentTasks: Task[];
  error: string;
}

const initialState: TasksState = {
  isLoading: false,
  currentTasks: [],
  error: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    _setStartLoading: (state: TasksState) => {
      state.isLoading = true;
    },
    _setFetchTasksSuccess: (
      state: TasksState,
      { payload }: PayloadAction<Task[]>,
    ) => {
      state.isLoading = false;
      state.error = '';

      state.currentTasks = payload;
    },
    _setError: (state: TasksState, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
    toggleTaskCompleted: (
      state: TasksState,
      { payload }: PayloadAction<string>,
    ) => {
      const task = state.currentTasks.find((t) => t.id === payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setText: (
      state: TasksState,
      { payload }: PayloadAction<{ taskId: string; text: string }>,
    ) => {
      const { taskId, text } = payload;
      const task = state.currentTasks.find((t) => t.id == taskId);
      if (task) {
        task.text = text;
      }
    },
  },
});

export const { toggleTaskCompleted, setText } = tasksSlice.actions;

const {
  _setError,
  _setStartLoading,
  _setFetchTasksSuccess,
} = tasksSlice.actions;

export function fetchTasks(checklistId: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(_setStartLoading());
      const tasks = await getTasks(checklistId);
      dispatch(_setFetchTasksSuccess(tasks));
    } catch (error) {
      dispatch(_setError(error.toString()));
    }
  };
}

export default tasksSlice.reducer;
