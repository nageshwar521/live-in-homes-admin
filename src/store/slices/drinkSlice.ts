import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  drinkList: [],
  errorResponse: null,
};

export const drinkSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    fetchDrinksListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchDrinksList";
    },
    fetchDrinksListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.drinkList = payload.data.drinks;
      state.message = payload.message;
    },
    fetchDrinksListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addDrinkRequest: (state, payload: PayloadAction<any>) => {
      state.status = "addDrink";
    },
    addDrinkSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addDrinkFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateDrinkRequest: (state, payload: PayloadAction<any>) => {
      state.status = "updateDrink";
    },
    updateDrinkSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateDrinkFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteDrinkRequest: (state, payload: PayloadAction<any>) => {
      state.status = "deleteDrink";
    },
    deleteDrinkSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteDrinkFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetDrinkState: (state, { payload }: PayloadAction<any>) => {
      console.log(payload, "resetDrinkState payload");
      state = { ...state, ...payload };
    },
  },
});

export const {
  fetchDrinksListRequest,
  fetchDrinksListSuccess,
  fetchDrinksListFailed,
  addDrinkRequest,
  addDrinkSuccess,
  addDrinkFailed,
  updateDrinkRequest,
  updateDrinkSuccess,
  updateDrinkFailed,
  deleteDrinkRequest,
  deleteDrinkSuccess,
  deleteDrinkFailed,
  resetDrinkState,
} = drinkSlice.actions;
