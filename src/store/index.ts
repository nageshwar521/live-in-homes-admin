import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import { authSlice } from "./slices/authSlice";
import { cafeSlice } from "./slices/cafeSlice";
import { employeeSlice } from "./slices/employeeSlice";
import { userSlice } from "./slices/userSlice";
import { locationSlice } from "./slices/locationSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { drinkSlice } from "./slices/drinkSlice";
import { branchSlice } from "./slices/branchSlice";
import { amenitySlice } from "./slices/amenitySlice";
import { conditionSlice } from "./slices/conditionSlice";
import { categorySlice } from "./slices/categorySlice";
import { postSlice } from "./slices/postSlice";
import { commonSlice } from "./slices/commonSlice";

const rootReducer = combineReducers({
  amenities: amenitySlice.reducer,
  auth: authSlice.reducer,
  branches: branchSlice.reducer,
  cafes: cafeSlice.reducer,
  categories: categorySlice.reducer,
  conditions: conditionSlice.reducer,
  drinks: drinkSlice.reducer,
  locations: locationSlice.reducer,
  employees: employeeSlice.reducer,
  posts: postSlice.reducer,
  users: userSlice.reducer,
  common: commonSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
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
