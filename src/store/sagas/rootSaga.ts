import { all } from "redux-saga/effects";
import cafeSaga from "./cafeSaga";
import employeeSaga from "./employeeSaga";
import locationSaga from "./locationSaga";

export default function* rootSaga() {
  yield all([cafeSaga(), employeeSaga(), locationSaga()]);
}
