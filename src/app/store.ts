import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
const rootReducer = combineSlices(currentTodoSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
