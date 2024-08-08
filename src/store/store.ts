import { configureStore } from '@reduxjs/toolkit';
import { newsSliceReducer } from './newsListSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		newsSliceReducer
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;