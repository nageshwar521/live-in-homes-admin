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
      state.status = "fetchCafeList";
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
      state.status = "addCafe";
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
      state.status = "updateCafe";
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
      state.status = "deleteCafe";
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
      console.log(payload, "resetCafeState payload");
      state = { ...state, ...payload };
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
  resetCafeState,
} = cafeSlice.actions;
