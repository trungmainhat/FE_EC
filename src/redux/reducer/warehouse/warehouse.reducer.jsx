import { createSlice } from '@reduxjs/toolkit';

export const warehouseReducer = createSlice({
  name: 'warehouse',
  initialState: {
    key: 0,
    isAdd: false,
    isExport: false,
    warehouse: {},
    importPrint: false,
    importPrintContent: {},
    exportPrint: false,
    importRequire: false,
    importRequireData: {},
    exportPrintContent: {},
  },
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setIsImportStorage: (state, action) => {
      state.isAdd = action.payload;
    },
    setIsExportStorage: (state, action) => {
      state.isExport = action.payload;
    },
    setWareHouse: (state, action) => {
      state.warehouse = action.payload;
    },
    setImportPrint: (state, action) => {
      state.importPrint = action.payload;
    },
    setImportPrintContent: (state, action) => {
      state.importPrintContent = action.payload;
    },
    setExportPrint: (state, action) => {
      state.exportPrint = action.payload;
    },
    setImportRequire: (state, action) => {
      state.importRequire = action.payload;
    },
    setImportRequireData: (state, action) => {
      state.importRequireData = action.payload;
    },
    setExportPrintContent: (state, action) => {
      state.exportPrintContent = action.payload;
    },
  },
});

export const {
  setImportRequire,
  setIsImportStorage,
  setWareHouse,
  setIsExportStorage,
  setImportPrint,
  setImportPrintContent,
  setExportPrintContent,
  setExportPrint,
  setImportRequireData,
} = warehouseReducer.actions;

export default warehouseReducer.reducer;
