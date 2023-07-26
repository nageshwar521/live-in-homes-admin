import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { cafeSlice } from "../slices/cafeSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addCafeApi,
  deleteCafeApi,
  getCafeListApi,
  updateCafeApi,
} from "../../api/cafeApi";

const cafeActions = cafeSlice.actions;

function* fetchCafeList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getCafeListApi(
      action.payload
    );
    if (get(response, "success")) {
      yield put(cafeActions.fetchCafeListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch cafes list`, error);
    yield put(cafeActions.fetchCafeListFailed(error));
  }
}

function* addCafe(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addCafeApi,
      action.payload
    );
    console.log(response, "addCafe response");
    if (get(response, "success")) {
      yield put(cafeActions.addCafeSuccess(response));
      yield call(fetchCafeList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add cafe`, error);
    yield put(cafeActions.addCafeFailed(get(error, "response.data")));
  }
}

function* updateCafe(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateCafeApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(cafeActions.updateCafeSuccess(response));
      yield call(fetchCafeList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update cafe`, error);
    yield put(cafeActions.updateCafeFailed(get(error, "response.data")));
  }
}

function* deleteCafe(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteCafeApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(cafeActions.deleteCafeSuccess(response));
      yield call(fetchCafeList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete cafe`, error);
    yield put(cafeActions.deleteCafeFailed(get(error, "response.data")));
  }
}

export default function* cafeSaga() {
  yield takeLatest(cafeActions.fetchCafeListRequest.type, fetchCafeList);
  yield takeLatest(cafeActions.addCafeRequest.type, addCafe);
  yield takeLatest(cafeActions.updateCafeRequest.type, updateCafe);
  yield takeLatest(cafeActions.deleteCafeRequest.type, deleteCafe);
}
