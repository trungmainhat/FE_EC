import { createSlice } from '@reduxjs/toolkit';

export const productReducer = createSlice({
  name: 'product',
  initialState: {
    key: 0,
    isAdd: false,
    isEdit: false,
    isRequireImport: false,
    product: {},
  },
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setIsAdd: (state, action) => {
      state.isAdd = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setIsRequireImport: (state, action) => {
      state.isRequireImport = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setIsAdd, setIsEdit, setProduct, setIsRequireImport } = productReducer.actions;

export default productReducer.reducer;
