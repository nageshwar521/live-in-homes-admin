import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  addLocationApi,
  deleteLocationApi,
  getLocationListApi,
  updateLocationApi,
} from "../../api/locationApi";
import { locationSlice } from "../slices/locationSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";

const locationActions = locationSlice.actions;

function* fetchLocationList() {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      getLocationListApi
    );
    if (get(response, "success")) {
      yield put(locationActions.fetchLocationListSuccess(response));
    }
    throw response;
  } catch (error) {
    console.log(`Failed to fetch locations list`, error);
    yield put(locationActions.fetchLocationListFailed(error));
  }
}

function* addLocation() {
  try {
    const action: PayloadAction<any> = yield take(
      locationActions.addLocationRequest.type
    );
    const response: ApiSuccessResponse = yield call(
      addLocationApi,
      action.payload
    );
    yield put(locationActions.addLocationSuccess(response));
  } catch (error) {
    console.log(`Failed to add location`, error);
    yield put(locationActions.addLocationFailed(error));
  }
}

function* updateLocation() {
  try {
    const action: PayloadAction<any> = yield take(
      locationActions.updateLocationRequest.type
    );
    const response: ApiSuccessResponse = yield call(
      updateLocationApi,
      action.payload
    );
    yield put(locationActions.updateLocationSuccess(response));
  } catch (error) {
    console.log(`Failed to update location`, error);
    yield put(locationActions.updateLocationFailed(error));
  }
}

function* deleteLocation() {
  try {
    const action: PayloadAction<any> = yield take(
      locationActions.deleteLocationRequest.type
    );
    const response: ApiSuccessResponse = yield call(
      deleteLocationApi,
      action.payload.id
    );
    yield put(locationActions.deleteLocationSuccess(response));
  } catch (error) {
    console.log(`Failed to delete location`, error);
    yield put(locationActions.deleteLocationFailed(error));
  }
}

export default function* locationSaga() {
  yield takeLatest(
    locationActions.fetchLocationListRequest.type,
    fetchLocationList
  );
  yield takeLatest(locationActions.addLocationRequest.type, addLocation);
  yield takeLatest(locationActions.updateLocationRequest.type, updateLocation);
  yield takeLatest(locationActions.deleteLocationRequest.type, deleteLocation);
}
