import { all } from "redux-saga/effects";
import cafeSaga from "./cafeSaga";
import employeeSaga from "./employeeSaga";
import locationSaga from "./locationSaga";
import branchSaga from "./branchSaga";
import amenitySaga from "./amenitySaga";
import categorySaga from "./categorySaga";
import conditionSaga from "./conditionSaga";
import postSaga from "./postSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([
    amenitySaga(),
    branchSaga(),
    cafeSaga(),
    categorySaga(),
    conditionSaga(),
    employeeSaga(),
    locationSaga(),
    postSaga(),
    userSaga(),
  ]);
}
