import { RootState } from "./redux/store";

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.filter((obj) => obj.id === id);
