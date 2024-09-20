import { createSlice } from "@reduxjs/toolkit";
import { AllPruduct } from "./API";

const initialState = {
  loading: false,
  product: [],
  cart: [],
  totel: 0,
  err: null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(AllPruduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllPruduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(AllPruduct.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      });
  },
  reducers: {
    addtoCart: (state, action) => {
      
      state.cart = [...state.cart, action.payload];

      console.log(state.cart);
    },
  },
});

export default ProductSlice.reducer;

// eslint-disable-next-line react-refresh/only-export-components
export const { addtoCart } = ProductSlice.actions;
