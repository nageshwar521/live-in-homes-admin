import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  userList: [],
  errorResponse: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUserListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "loading";
    },
    fetchUserListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.userList = payload.data.users;
      state.message = payload.message;
    },
    fetchUserListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addUserRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    addUserSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addUserFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateUserRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    updateUserSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateUserFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteUserRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    deleteUserSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteUserFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetUserState: (state, { payload }: PayloadAction<any>) => {
      (state as any)[payload.field] = payload.value;
    },
  },
});

export const {
  fetchUserListRequest,
  fetchUserListSuccess,
  fetchUserListFailed,
  addUserRequest,
  addUserSuccess,
  addUserFailed,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;
