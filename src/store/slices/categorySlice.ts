import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  categoryList: [],
  errorResponse: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoryListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchCategoryList";
    },
    fetchCategoryListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.categoryList = payload.data.categories;
      state.message = payload.message;
    },
    fetchCategoryListFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addCategoryRequest: (state, payload: PayloadAction<any>) => {
      state.status = "addCategory";
    },
    addCategorySuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addCategoryFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updateCategoryRequest: (state, payload: PayloadAction<any>) => {
      state.status = "updateCategory";
    },
    updateCategorySuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updateCategoryFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deleteCategoryRequest: (state, payload: PayloadAction<any>) => {
      state.status = "deleteCategory";
    },
    deleteCategorySuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deleteCategoryFailed: (state, { payload }) => {
      state.status = "error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetCategoryState: (state, { payload }: PayloadAction<any>) => {
      console.log(payload, "resetCategoryState payload");
      state = { ...state, ...payload };
    },
  },
});

export const {
  fetchCategoryListRequest,
  fetchCategoryListSuccess,
  fetchCategoryListFailed,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFailed,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailed,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailed,
  resetCategoryState,
} = categorySlice.actions;
