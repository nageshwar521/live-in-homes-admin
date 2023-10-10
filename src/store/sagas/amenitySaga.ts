import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { amenitySlice } from "../slices/amenitySlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addAmenityApi,
  deleteAmenityApi,
  getAmenityListApi,
  updateAmenityApi,
} from "../../api/amenityApi";

const amenityActions = amenitySlice.actions;

function* fetchAmenityList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getAmenityListApi(
      action.payload
    );
    if (get(response, "success")) {
      yield put(amenityActions.fetchAmenityListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch amenitys list`, error);
    yield put(amenityActions.fetchAmenityListFailed(error));
  }
}

function* addAmenity(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addAmenityApi,
      action.payload
    );
    console.log(response, "addAmenity response");
    if (get(response, "success")) {
      yield put(amenityActions.addAmenitySuccess(response));
      yield call(fetchAmenityList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add amenity`, error);
    yield put(amenityActions.addAmenityFailed(get(error, "response.data")));
  }
}

function* updateAmenity(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateAmenityApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(amenityActions.updateAmenitySuccess(response));
      yield call(fetchAmenityList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update amenity`, error);
    yield put(amenityActions.updateAmenityFailed(get(error, "response.data")));
  }
}

function* deleteAmenity(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteAmenityApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(amenityActions.deleteAmenitySuccess(response));
      yield call(fetchAmenityList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete amenity`, error);
    yield put(amenityActions.deleteAmenityFailed(get(error, "response.data")));
  }
}

export default function* amenitySaga() {
  yield takeLatest(
    amenityActions.fetchAmenityListRequest.type,
    fetchAmenityList
  );
  yield takeLatest(amenityActions.addAmenityRequest.type, addAmenity);
  yield takeLatest(amenityActions.updateAmenityRequest.type, updateAmenity);
  yield takeLatest(amenityActions.deleteAmenityRequest.type, deleteAmenity);
}
