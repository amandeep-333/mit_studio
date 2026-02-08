import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  uploadDesignFile,
  saveDesign,
  getUserDesigns,
} from '../services/api';

const initialState = {
  uploadedDesign: null,
  uploadedFileUrl: null,
  position: { x: 50, y: 40 },
  size: 30,
  rotation: 0,
  productType: 'tshirt',
  color: 'white',
  printType: 'regular',
  savedDesigns: [],
  status: 'idle',
  error: null,
};

/* ---------- Async Actions ---------- */

export const uploadDesign = createAsyncThunk(
  'design/upload',
  async (file) => uploadDesignFile(file)
);

export const fetchUserDesigns = createAsyncThunk(
  'design/fetchUserDesigns',
  async (userId) => getUserDesigns(userId)
);

export const saveCurrentDesign = createAsyncThunk(
  'design/save',
  async (data) => saveDesign(data)
);

/* ---------- Slice ---------- */

const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    setUploadedPreview(state, action) {
      state.uploadedDesign = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setRotation(state, action) {
      state.rotation = action.payload;
    },
    setProductType(state, action) {
      state.productType = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setPrintType(state, action) {
      state.printType = action.payload;
    },
    resetDesign(state) {
      state.position = { x: 50, y: 40 };
      state.size = 30;
      state.rotation = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDesign.fulfilled, (state, action) => {
        state.uploadedFileUrl = action.payload.fileUrl;
      })
      .addCase(fetchUserDesigns.fulfilled, (state, action) => {
        state.savedDesigns = action.payload.designs || [];
      });
  },
});

export const {
  setUploadedPreview,
  setPosition,
  setSize,
  setRotation,
  setProductType,
  setColor,
  setPrintType,
  resetDesign,
} = designSlice.actions;

export default designSlice.reducer;
