import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { postSlice } from "../slices/postSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addPostApi,
  deletePostApi,
  getPostListApi,
  updatePostApi,
} from "../../api/postApi";

const postActions = postSlice.actions;

function* fetchPostList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getPostListApi(
      action.payload
    );
    console.log(response);
    if (get(response, "success")) {
      yield put(postActions.fetchPostListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch posts list`, error);
    yield put(postActions.fetchPostListFailed(get(error, "response.data")));
  }
}

function* addPost(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addPostApi,
      action.payload
    );
    console.log(response, "addPost response");
    if (get(response, "success")) {
      yield put(postActions.addPostSuccess(response));
      yield call(fetchPostList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add post`, error);
    yield put(postActions.addPostFailed(get(error, "response.data")));
  }
}

function* updatePost(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updatePostApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(postActions.updatePostSuccess(response));
      yield call(fetchPostList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update post`, error);
    yield put(postActions.updatePostFailed(get(error, "response.data")));
  }
}

function* deletePost(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deletePostApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(postActions.deletePostSuccess(response));
      yield call(fetchPostList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete post`, error);
    yield put(postActions.deletePostFailed(get(error, "response.data")));
  }
}

export default function* postSaga() {
  yield takeLatest(postActions.fetchPostListRequest.type, fetchPostList);
  yield takeLatest(postActions.addPostRequest.type, addPost);
  yield takeLatest(postActions.updatePostRequest.type, updatePost);
  yield takeLatest(postActions.deletePostRequest.type, deletePost);
}
