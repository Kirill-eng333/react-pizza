import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, Pizza, PizzaSliceState } from './types';

// === AsyncThunk ===
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;

    try {
      const { data } = await axios.get<Pizza[]>(
        `https://6894d1a6be3700414e149f70.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Ошибка загрузки пицц');
    }
  }
);

 export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
  error: 'string'
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.error = 'string';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        // безопасная проверка
        state.error = (action.payload as string) || action.error.message || 'Неизвестная ошибка';
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;

