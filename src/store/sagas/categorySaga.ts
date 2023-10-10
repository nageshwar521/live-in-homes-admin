import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { categorySlice } from "../slices/categorySlice";
import { ApiSuccessResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryListApi,
  updateCategoryApi,
} from "../../api/categoryApi";

const categoryActions = categorySlice.actions;

function* fetchCategoryList(action: any) {
  console.log("fetchCategoryList");
  try {
    const { data: response }: ApiSuccessResponse = yield getCategoryListApi(
      action.payload
    );
    if (get(response, "success")) {
      yield put(categoryActions.fetchCategoryListSuccess(response));
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to fetch categorys list`, error);
    yield put(categoryActions.fetchCategoryListFailed(error));
  }
}

function* addCategory(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      addCategoryApi,
      action.payload
    );
    console.log(response, "addCategory response");
    if (get(response, "success")) {
      yield put(categoryActions.addCategorySuccess(response));
      yield call(fetchCategoryList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to add category`, error);
    yield put(categoryActions.addCategoryFailed(get(error, "response.data")));
  }
}

function* updateCategory(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      updateCategoryApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(categoryActions.updateCategorySuccess(response));
      yield call(fetchCategoryList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to update category`, error);
    yield put(
      categoryActions.updateCategoryFailed(get(error, "response.data"))
    );
  }
}

function* deleteCategory(action: PayloadAction<any>) {
  try {
    const { data: response }: ApiSuccessResponse = yield call(
      deleteCategoryApi,
      action.payload
    );
    if (get(response, "success")) {
      yield put(categoryActions.deleteCategorySuccess(response));
      yield call(fetchCategoryList, {});
    } else {
      throw response;
    }
  } catch (error) {
    console.log(`Failed to delete category`, error);
    yield put(
      categoryActions.deleteCategoryFailed(get(error, "response.data"))
    );
  }
}

export default function* categorySaga() {
  yield takeLatest(
    categoryActions.fetchCategoryListRequest.type,
    fetchCategoryList
  );
  yield takeLatest(categoryActions.addCategoryRequest.type, addCategory);
  yield takeLatest(categoryActions.updateCategoryRequest.type, updateCategory);
  yield takeLatest(categoryActions.deleteCategoryRequest.type, deleteCategory);
}
