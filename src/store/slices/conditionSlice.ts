import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  conditionList: [],
  errorResponse: null,
};

export const conditionSlice = createSlice({
  name: "conditions",
  initialState,
  reducers: {
    fetchConditionListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchConditionList";
    },
    fetchConditionListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.conditionList = payload.data.conditions;
      state.message = payload.message;
    },
    fetchConditionListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addConditionRequest: (state, payload: PayloadAction<any>) => {
      state.status = "addCondition";
    },
    addConditionSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addConditionFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateConditionRequest: (state, payload: PayloadAction<any>) => {
      state.status = "updateCondition";
    },
    updateConditionSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateConditionFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteConditionRequest: (state, payload: PayloadAction<any>) => {
      state.status = "deleteCondition";
    },
    deleteConditionSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteConditionFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetConditionState: (state, { payload }: PayloadAction<any>) => {
      console.log(payload, "resetConditionState payload");
      state = { ...state, ...payload };
    },
  },
});

export const {
  fetchConditionListRequest,
  fetchConditionListSuccess,
  fetchConditionListFailed,
  addConditionRequest,
  addConditionSuccess,
  addConditionFailed,
  updateConditionRequest,
  updateConditionSuccess,
  updateConditionFailed,
  deleteConditionRequest,
  deleteConditionSuccess,
  deleteConditionFailed,
  resetConditionState,
} = conditionSlice.actions;
