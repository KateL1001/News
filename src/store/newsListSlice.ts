import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewsItemScheme } from '../interfaces/NewsItemScheme';
import { getNews } from '../helpers/fetchItems';


export interface NewsState {
  news: NewsItemScheme[],
  loading?: boolean,
  error?: string | undefined
}

const initialState: NewsState = {
	news: [],
	loading: false,
	error: undefined
};

export const getNewsThunk = createAsyncThunk(
	'news/getNews',  async () => {
		return getNews('beststories.json?print=pretty&limitToFirst=100&orderBy="$key"');
	}
);

export const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getNewsThunk.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getNewsThunk.fulfilled, (state, action) => {
			state.loading = false;
			if(action.payload) {
				state.news = action.payload.sort((a,b) => b.time - a.time);
			}else {
				throw new Error('PromiseAll error');
			}
		});
		builder.addCase(getNewsThunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;

		});
	}
});

export const newsSliceActions = newsSlice.actions;

export const newsSliceReducer = newsSlice.reducer;