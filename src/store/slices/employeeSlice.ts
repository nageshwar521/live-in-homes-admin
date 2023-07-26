import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  employeeList: [],
  errorResponse: null,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    fetchEmployeeListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "loading";
    },
    fetchEmployeeListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.employeeList = payload.data.employees;
      state.message = payload.message;
    },
    fetchEmployeeListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addEmployeeRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    addEmployeeSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addEmployeeFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateEmployeeRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    updateEmployeeSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateEmployeeFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteEmployeeRequest: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    deleteEmployeeSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteEmployeeFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetEmployeeState: (state, { payload }: PayloadAction<any>) => {
      (state as any)[payload.field] = payload.value;
    },
  },
});

export const {
  fetchEmployeeListRequest,
  fetchEmployeeListSuccess,
  fetchEmployeeListFailed,
  addEmployeeRequest,
  addEmployeeSuccess,
  addEmployeeFailed,
  updateEmployeeRequest,
  updateEmployeeSuccess,
  updateEmployeeFailed,
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  deleteEmployeeFailed,
} = employeeSlice.actions;
