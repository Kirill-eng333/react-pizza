import { CartItem } from "../redux/Slices/cart/types";

export const callTP = (items: CartItem[]) => {
  return items.reduce((sum, obj) =>  obj.price * obj.count + sum, 0);
}