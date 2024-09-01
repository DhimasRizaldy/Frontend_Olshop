// reducers/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definisikan tipe untuk item di keranjang
interface CartItem {
  productId: string;
  qty: number;
  cartId?: string; // Tambahkan properti ini jika perlu
}

// Definisikan tipe untuk state awal
interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

// State awal dengan tipe `CartState`
const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId,
      );
      if (item) {
        item.qty += action.payload.qty;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ cartId: string; qty: number }>,
    ) => {
      const item = state.cartItems.find(
        (item) => item.cartId === action.payload.cartId,
      );
      if (item) {
        item.qty = action.payload.qty;
      }
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
