import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  postList: [],
  errorResponse: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostListRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchPostList_loading";
    },
    fetchPostListSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "fetchPostList_success";
      state.postList = payload.data.posts;
      state.message = payload.message;
    },
    fetchPostListFailed: (state, { payload }) => {
      state.status = "fetchPostList_error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    addPostRequest: (state, payload: PayloadAction<any>) => {
      state.status = "addPost_loading";
    },
    addPostSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "addPost_success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    addPostFailed: (state, { payload }) => {
      console.log("addPostFailed");
      state.status = "addPost_error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    updatePostRequest: (state, payload: PayloadAction<any>) => {
      state.status = "updatePost_loading";
    },
    updatePostSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "updatePost_success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    updatePostFailed: (state, { payload }) => {
      state.status = "updatePost_error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    deletePostRequest: (state, payload: PayloadAction<any>) => {
      state.status = "deletePost_loading";
    },
    deletePostSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "deletePost_success";
      state.message = payload.message;
      toast.success(payload.message);
    },
    deletePostFailed: (state, { payload }) => {
      state.status = "deletePost_error";
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetPostState: (state, { payload }: PayloadAction<any>) => {
      (state as any)[payload.field] = payload.value;
    },
  },
});

export const {
  fetchPostListRequest,
  fetchPostListSuccess,
  fetchPostListFailed,
  addPostRequest,
  addPostSuccess,
  addPostFailed,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailed,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailed,
} = postSlice.actions;
