import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import { cafeSlice } from "./slices/cafeSlice";
import { employeeSlice } from "./slices/employeeSlice";
import { locationSlice } from "./slices/locationSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  cafes: cafeSlice.reducer,
  employees: employeeSlice.reducer,
  locations: locationSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
