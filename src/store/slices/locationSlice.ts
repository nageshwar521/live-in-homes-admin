import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  locationList: [],
  errorResponse: null,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    fetchLocationListRequest: (state) => {
      state.status = "loading";
    },
    fetchLocationListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.locationList = payload.data.locations;
      state.message = payload.message;
    },
    fetchLocationListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
    },
    addLocationRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    addLocationSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
    },
    addLocationFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
    },
    updateLocationRequest: (state) => {
      state.status = "loading";
    },
    updateLocationSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
    },
    updateLocationFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
    },
    deleteLocationRequest: (state) => {
      state.status = "loading";
    },
    deleteLocationSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
    },
    deleteLocationFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
    },
    resetLocationState: (state, { payload }: PayloadAction<any>) => {
      (state as any)[payload.field] = payload.value;
    },
  },
});

export const {
  fetchLocationListRequest,
  fetchLocationListSuccess,
  fetchLocationListFailed,
  addLocationRequest,
  addLocationSuccess,
  addLocationFailed,
  updateLocationSuccess,
  updateLocationFailed,
  deleteLocationSuccess,
  deleteLocationFailed,
} = locationSlice.actions;
