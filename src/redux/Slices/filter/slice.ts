import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    }, 
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<Partial<FilterSliceState>>) {
      if (action.payload.sort) {
        state.sort = action.payload.sort;
      }
      if (action.payload.categoryId !== undefined) {
        state.categoryId = Number(action.payload.categoryId);
      }
      if (action.payload.currentPage !== undefined) {
        state.currentPage = Number(action.payload.currentPage);
      }
      if (action.payload.searchValue !== undefined) {
        state.searchValue = action.payload.searchValue;
      }
    }

  }
});


export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
