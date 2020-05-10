import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import checklistReducer from './checklists';
import taskReducer from './tasks';

const rootReducer = combineReducers({
  checklists: checklistReducer,
  tasks: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
