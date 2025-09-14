"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CartItem {
  product: string;
  quantity: number;
  selectedSize: string;
}

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;

  address: Address[];
  wishlist: string[];
  cart: CartItem[];
}

interface UserState {
  user: User | null;   
  isLoggedIn: boolean;
  token?: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  token: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{user:User; token:string}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      if (state.user) state.user.cart = action.payload;
    },
    updateWishlist: (state, action: PayloadAction<string[]>) => {
      if (state.user) state.user.wishlist = action.payload;
    },
    updateAddress: (state, action: PayloadAction<Address[]>) => {
      if (state.user) state.user.address = action.payload;
    },
  },
});

export const { setUser, logout, updateCart, updateWishlist, updateAddress } =
  userSlice.actions;
export default userSlice.reducer;


