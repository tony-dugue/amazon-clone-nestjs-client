import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ProductDocument} from "./models/Products";
import {Cart} from "./models/Cart";

import productService from "./services/product.service";
import {register} from "../auth/authSlice";

// TODO: move higher in global => refactorisation (commun avec auth)
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  products: ProductDocument[];
  cart: Cart;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
}

const modifyQtyByOne = (cart: Cart, selectedProduct: ProductDocument, modificationType: 'INCREMENT' | 'DECREMENT') => {

  const previousCart = [...cart]
  const productInCart = previousCart.find( product => product._id === selectedProduct._id)

  let newCart = [];

  if (!productInCart) {
    // Si le produit n'est pas dans le panier, on l'ajoute
    previousCart.push({ ...selectedProduct, quantity: 1 })
    newCart = previousCart
  } else {
    // si le produit est déjà dans le panier, on récupère que celui-ci
    const filteredCart = previousCart.filter(p => p._id !== productInCart._id)

    const modification = modificationType === 'INCREMENT' ? 1 : -1;

    productInCart.quantity = productInCart.quantity + modification;

    if (productInCart.quantity === 0) {
      // si le produit à une quantité de 0 après décrémentation, on le retire du panier
      newCart = [...filteredCart]
    } else {
      // si le produit à une quantité > 0 après modif, on ajoute dans le panier le produit modifié
      newCart = [...filteredCart, productInCart]
    }
  }
  return newCart
}

export const getProducts = createAsyncThunk(
  'product',
  async() => {
    try {
      return await productService.getProducts()
    } catch (error) {
      console.log('Error: ', error)
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'INCREMENT');
      state.cart = modifiedCart
    },
    decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'DECREMENT');
      state.cart = modifiedCart
    },
    resetCart: (state) => {
      state.cart = []
    }
  },
  extraReducers: (builder => {
    builder
      // GET ALL PRODUCTS
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
      })
  })
})

export const { incrementProduct, decrementProduct, resetCart } = productSlice.actions;

export default productSlice.reducer;

