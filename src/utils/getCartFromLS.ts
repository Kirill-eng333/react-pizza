import { CartItem } from '../redux/Slices/cart/types';
import {callTP} from './callTP'

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data): []
  const totalPrice = callTP(items);


    return {
      items: items as CartItem[],
      totalPrice,
    };
  }

