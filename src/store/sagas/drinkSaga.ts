import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { drinkSlice } from "../slices/drinkSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addDrinkApi,
  deleteDrinkApi,
  getDrinkListApi,
  updateDrinkApi,
} from "../../api/drinkApi";

const drinkActions = drinkSlice.actions;

function* fetchDrinkList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getDrinkListApi(
      action.payload
    );
    if (get(response, "success")) {
      yield put(drinkActions.fetchDrinkListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch drinks list`, error);
    yield put(drinkActions.fetchDrinkListFailed(error));
  }
}

function* addDrink(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addDrinkApi,
      action.payload
    );
    console.log(response, "addDrink response");
    if (get(response, "success")) {
      yield put(drinkActions.addDrinkSuccess(response));
      yield call(fetchDrinkList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add drink`, error);
    yield put(drinkActions.addDrinkFailed(get(error, "response.data")));
  }
}

function* updateDrink(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateDrinkApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(drinkActions.updateDrinkSuccess(response));
      yield call(fetchDrinkList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update drink`, error);
    yield put(drinkActions.updateDrinkFailed(get(error, "response.data")));
  }
}

function* deleteDrink(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteDrinkApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(drinkActions.deleteDrinkSuccess(response));
      yield call(fetchDrinkList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete drink`, error);
    yield put(drinkActions.deleteDrinkFailed(get(error, "response.data")));
  }
}

export default function* drinkSaga() {
  yield takeLatest(drinkActions.fetchDrinkListRequest.type, fetchDrinkList);
  yield takeLatest(drinkActions.addDrinkRequest.type, addDrink);
  yield takeLatest(drinkActions.updateDrinkRequest.type, updateDrink);
  yield takeLatest(drinkActions.deleteDrinkRequest.type, deleteDrink);
}
