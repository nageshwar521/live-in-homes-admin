import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { amenitySlice } from "../slices/amenitySlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import { authSlice } from "../slices/authSlice";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  resetPasswordApi,
  signupApi,
} from "../../api/authApi";

const authActions = authSlice.actions;

function* userSignup(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      signupApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(authActions.userSignupSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to signup`, get(error, "response.data"));
    yield put(authActions.userSignupFailed(get(error, "response.data")));
  }
}

function* userLogin(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      loginApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(authActions.userLoginSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to login`, error);
    yield put(authActions.userLoginFailed(get(error, "response.data")));
  }
}

function* userLogout(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      logoutApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(authActions.userLogoutSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to logout`, error);
    yield put(authActions.userLogoutFailed(get(error, "response.data")));
  }
}

function* resetPassword(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      resetPasswordApi,
      action.payload
    );
    console.log(response, "resetPasswordApi response");
    if (get(response, "success")) {
      yield put(authActions.resetPasswordSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to login`, error);
    yield put(authActions.resetPasswordFailed(get(error, "response.data")));
  }
}

function* forgotPassword(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      forgotPasswordApi,
      action.payload
    );
    console.log(response, "forgotPasswordApi response");
    if (get(response, "success")) {
      yield put(authActions.forgotPasswordSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to login`, error);
    yield put(authActions.forgotPasswordFailed(get(error, "response.data")));
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.userSignupRequest.type, userSignup);
  yield takeLatest(authActions.userLoginRequest.type, userLogin);
  yield takeLatest(authActions.userLogoutRequest.type, userLogout);
  yield takeLatest(authActions.resetPasswordRequest.type, resetPassword);
  yield takeLatest(authActions.forgotPasswordRequest.type, forgotPassword);
}
