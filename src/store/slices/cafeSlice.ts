import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  cafeList: [],
  errorResponse: null,
};

export const cafeSlice = createSlice({
  name: "cafes",
  initialState,
  reducers: {
    fetchCafeListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "loading";
    },
    fetchCafeListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.cafeList = payload.data.cafes;
      state.message = payload.message;
    },
    fetchCafeListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addCafeRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    addCafeSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addCafeFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateCafeRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    updateCafeSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateCafeFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteCafeRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    deleteCafeSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteCafeFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetCafeState: (state, { payload }: PayloadAction<any>) => {
      (state as any)[payload.field] = payload.value;
    },
  },
});

export const {
  fetchCafeListRequest,
  fetchCafeListSuccess,
  fetchCafeListFailed,
  addCafeRequest,
  addCafeSuccess,
  addCafeFailed,
  updateCafeRequest,
  updateCafeSuccess,
  updateCafeFailed,
  deleteCafeRequest,
  deleteCafeSuccess,
  deleteCafeFailed,
} = cafeSlice.actions;
