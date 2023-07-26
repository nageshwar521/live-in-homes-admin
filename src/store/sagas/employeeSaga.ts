import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { employeeSlice } from "../slices/employeeSlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addEmployeeApi,
  deleteEmployeeApi,
  getEmployeeListApi,
  updateEmployeeApi,
} from "../../api/employeeApi";

const employeeActions = employeeSlice.actions;

function* fetchEmployeeList(action: any) {
  try {
    const { data: response }: ApiSuccessResponse = yield getEmployeeListApi(
      action.payload
    );
    console.log(response);
    if (get(response, "success")) {
      yield put(employeeActions.fetchEmployeeListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch employees list`, error);
    yield put(
      employeeActions.fetchEmployeeListFailed(get(error, "response.data"))
    );
  }
}

function* addEmployee(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addEmployeeApi,
      action.payload
    );
    console.log(response, "addEmployee response");
    if (get(response, "success")) {
      yield put(employeeActions.addEmployeeSuccess(response));
      yield call(fetchEmployeeList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add employee`, error);
    yield put(employeeActions.addEmployeeFailed(get(error, "response.data")));
  }
}

function* updateEmployee(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateEmployeeApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(employeeActions.updateEmployeeSuccess(response));
      yield call(fetchEmployeeList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update employee`, error);
    yield put(
      employeeActions.updateEmployeeFailed(get(error, "response.data"))
    );
  }
}

function* deleteEmployee(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteEmployeeApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(employeeActions.deleteEmployeeSuccess(response));
      yield call(fetchEmployeeList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete employee`, error);
    yield put(
      employeeActions.deleteEmployeeFailed(get(error, "response.data"))
    );
  }
}

export default function* employeeSaga() {
  yield takeLatest(
    employeeActions.fetchEmployeeListRequest.type,
    fetchEmployeeList
  );
  yield takeLatest(employeeActions.addEmployeeRequest.type, addEmployee);
  yield takeLatest(employeeActions.updateEmployeeRequest.type, updateEmployee);
  yield takeLatest(employeeActions.deleteEmployeeRequest.type, deleteEmployee);
}
