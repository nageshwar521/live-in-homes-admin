import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { userSlice } from "../slices/userSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addUserApi,
  deleteUserApi,
  getUserListApi,
  updateUserApi,
} from "../../api/userApi";

const userActions = userSlice.actions;

function* fetchUserList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getUserListApi(
      action.payload
    );
    console.log(response);
    if (get(response, "success")) {
      yield put(userActions.fetchUserListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch users list`, error);
    yield put(userActions.fetchUserListFailed(get(error, "response.data")));
  }
}

function* addUser(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addUserApi,
      action.payload
    );
    console.log(response, "addUser response");
    if (get(response, "success")) {
      yield put(userActions.addUserSuccess(response));
      yield call(fetchUserList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add user`, error);
    yield put(userActions.addUserFailed(get(error, "response.data")));
  }
}

function* updateUser(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateUserApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(userActions.updateUserSuccess(response));
      yield call(fetchUserList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update user`, error);
    yield put(userActions.updateUserFailed(get(error, "response.data")));
  }
}

function* deleteUser(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteUserApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(userActions.deleteUserSuccess(response));
      yield call(fetchUserList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete user`, error);
    yield put(userActions.deleteUserFailed(get(error, "response.data")));
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.fetchUserListRequest.type, fetchUserList);
  yield takeLatest(userActions.addUserRequest.type, addUser);
  yield takeLatest(userActions.updateUserRequest.type, updateUser);
  yield takeLatest(userActions.deleteUserRequest.type, deleteUser);
}
