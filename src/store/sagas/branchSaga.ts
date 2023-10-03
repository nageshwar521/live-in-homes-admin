import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { branchSlice } from "../slices/branchSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addBranchApi,
  deleteBranchApi,
  getBranchListApi,
  updateBranchApi,
} from "../../api/branchApi";

const branchActions = branchSlice.actions;

function* fetchBranchList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getBranchListApi(
      action.payload
    );
    if (get(response, "success")) {
      yield put(branchActions.fetchBranchListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch branchs list`, error);
    yield put(branchActions.fetchBranchListFailed(error));
  }
}

function* addBranch(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addBranchApi,
      action.payload
    );
    console.log(response, "addBranch response");
    if (get(response, "success")) {
      yield put(branchActions.addBranchSuccess(response));
      yield call(fetchBranchList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add branch`, error);
    yield put(branchActions.addBranchFailed(get(error, "response.data")));
  }
}

function* updateBranch(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateBranchApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(branchActions.updateBranchSuccess(response));
      yield call(fetchBranchList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update branch`, error);
    yield put(branchActions.updateBranchFailed(get(error, "response.data")));
  }
}

function* deleteBranch(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteBranchApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(branchActions.deleteBranchSuccess(response));
      yield call(fetchBranchList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete branch`, error);
    yield put(branchActions.deleteBranchFailed(get(error, "response.data")));
  }
}

export default function* branchSaga() {
  yield takeLatest(branchActions.fetchBranchListRequest.type, fetchBranchList);
  yield takeLatest(branchActions.addBranchRequest.type, addBranch);
  yield takeLatest(branchActions.updateBranchRequest.type, updateBranch);
  yield takeLatest(branchActions.deleteBranchRequest.type, deleteBranch);
}
