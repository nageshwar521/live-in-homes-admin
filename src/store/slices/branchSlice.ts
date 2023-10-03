import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  branchList: [],
  errorResponse: null,
};

export const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    fetchBranchListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchBranchList";
    },
    fetchBranchListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.branchList = payload.data.branches;
      state.message = payload.message;
    },
    fetchBranchListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addBranchRequest: (state, payload: PayloadAction<any>) => {
      state.status = "addBranch";
    },
    addBranchSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addBranchFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateBranchRequest: (state, payload: PayloadAction<any>) => {
      state.status = "updateBranch";
    },
    updateBranchSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateBranchFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteBranchRequest: (state, payload: PayloadAction<any>) => {
      state.status = "deleteBranch";
    },
    deleteBranchSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteBranchFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetBranchState: (state, { payload }: PayloadAction<any>) => {
      console.log(payload, "resetBranchState payload");
      state = { ...state, ...payload };
    },
  },
});

export const {
  fetchBranchListRequest,
  fetchBranchListSuccess,
  fetchBranchListFailed,
  addBranchRequest,
  addBranchSuccess,
  addBranchFailed,
  updateBranchRequest,
  updateBranchSuccess,
  updateBranchFailed,
  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFailed,
  resetBranchState,
} = branchSlice.actions;
