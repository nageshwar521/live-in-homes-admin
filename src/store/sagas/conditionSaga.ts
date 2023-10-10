import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { conditionSlice } from "../slices/conditionSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addConditionApi,
  deleteConditionApi,
  getConditionListApi,
  updateConditionApi,
} from "../../api/conditionApi";

const conditionActions = conditionSlice.actions;

function* fetchConditionList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getConditionListApi(
      action.payload
    );
    if (get(response, "success")) {
      yield put(conditionActions.fetchConditionListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch conditions list`, error);
    yield put(conditionActions.fetchConditionListFailed(error));
  }
}

function* addCondition(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addConditionApi,
      action.payload
    );
    console.log(response, "addCondition response");
    if (get(response, "success")) {
      yield put(conditionActions.addConditionSuccess(response));
      yield call(fetchConditionList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add condition`, error);
    yield put(conditionActions.addConditionFailed(get(error, "response.data")));
  }
}

function* updateCondition(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateConditionApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(conditionActions.updateConditionSuccess(response));
      yield call(fetchConditionList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update condition`, error);
    yield put(
      conditionActions.updateConditionFailed(get(error, "response.data"))
    );
  }
}

function* deleteCondition(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteConditionApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(conditionActions.deleteConditionSuccess(response));
      yield call(fetchConditionList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete condition`, error);
    yield put(
      conditionActions.deleteConditionFailed(get(error, "response.data"))
    );
  }
}

export default function* conditionSaga() {
  yield takeLatest(
    conditionActions.fetchConditionListRequest.type,
    fetchConditionList
  );
  yield takeLatest(conditionActions.addConditionRequest.type, addCondition);
  yield takeLatest(
    conditionActions.updateConditionRequest.type,
    updateCondition
  );
  yield takeLatest(
    conditionActions.deleteConditionRequest.type,
    deleteCondition
  );
}
