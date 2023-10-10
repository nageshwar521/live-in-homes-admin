import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  amenityList: [],
  errorResponse: null,
};

export const amenitySlice = createSlice({
  name: "amenities",
  initialState,
  reducers: {
    fetchAmenityListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchAmenityList";
    },
    fetchAmenityListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.amenityList = payload.data.amenities;
      state.message = payload.message;
    },
    fetchAmenityListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addAmenityRequest: (state, payload: PayloadAction<any>) => {
      state.status = "addAmenity";
    },
    addAmenitySuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addAmenityFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateAmenityRequest: (state, payload: PayloadAction<any>) => {
      state.status = "updateAmenity";
    },
    updateAmenitySuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateAmenityFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteAmenityRequest: (state, payload: PayloadAction<any>) => {
      state.status = "deleteAmenity";
    },
    deleteAmenitySuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteAmenityFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetAmenityState: (state, { payload }: PayloadAction<any>) => {
      console.log(payload, "resetAmenityState payload");
      state = { ...state, ...payload };
    },
  },
});

export const {
  fetchAmenityListRequest,
  fetchAmenityListSuccess,
  fetchAmenityListFailed,
  addAmenityRequest,
  addAmenitySuccess,
  addAmenityFailed,
  updateAmenityRequest,
  updateAmenitySuccess,
  updateAmenityFailed,
  deleteAmenityRequest,
  deleteAmenitySuccess,
  deleteAmenityFailed,
  resetAmenityState,
} = amenitySlice.actions;
