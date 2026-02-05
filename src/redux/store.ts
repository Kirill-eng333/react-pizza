import { configureStore } from '@reduxjs/toolkit';

import filter from './Slices/filter/slice';
import cart from './Slices/cart/slice';
import pizzas from './Slices/pizzas/slice';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
});

// ===== Типы для TS =====
export type RootState = ReturnType<typeof store.getState>;
 type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;