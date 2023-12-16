import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { removeCookie, setCookie } from "../../utils/cookies";
import { getSessionExpiryTimeStamp } from "../../utils/common";

const initialState = {
  status: "initial",
  success: false,
  message: "",
  loginResponse: {
    accessToken: "",
    refreshToken: "",
    expiresIn: 0,
    user: null,
  },
  errorResponse: null,
  signupResponse: null,
  resetPasswordResponse: null,
  forgotPasswordResponse: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSignupRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "signup_loading";
    },
    userSignupSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "signup_success";
      state.success = true;
      state.signupResponse = payload.data;
      state.message = payload.message;
    },
    userSignupFailed: (state, { payload }) => {
      state.status = "signup_error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    userLoginRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "login_loading";
    },
    userLoginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "login_success";
      state.success = true;
      state.loginResponse = payload.data;
      state.message = payload.message;
      setCookie("accessToken", payload.data.accessToken, {
        expires: getSessionExpiryTimeStamp(payload.data.expiresIn),
      });
    },
    userLoginFailed: (state, { payload }) => {
      state.status = "login_error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    userLogoutRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "logout_loading";
    },
    userLogoutSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "logout_success";
      state.success = true;
      state.loginResponse = initialState.loginResponse;
      state.message = payload.message;
      removeCookie("accessToken");
    },
    userLogoutFailed: (state, { payload }) => {
      state.status = "logout_error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetPasswordRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "reset_loading";
    },
    resetPasswordSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "reset_success";
      state.success = true;
      state.resetPasswordResponse = payload.data;
      state.message = payload.message;
    },
    resetPasswordFailed: (state, { payload }) => {
      state.status = "reset_error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    forgotPasswordRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "forgot_loading";
    },
    forgotPasswordSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "forgot_success";
      state.success = true;
      state.forgotPasswordResponse = payload.data;
      state.message = payload.message;
    },
    forgotPasswordFailed: (state, { payload }) => {
      state.status = "forgot_error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetAuthState: (state, { payload }: PayloadAction<any>) => {
      console.log(payload, "resetAuthState payload");
      state = { ...state, ...payload };
    },
  },
});

export const {
  userSignupRequest,
  userSignupSuccess,
  userSignupFailed,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
  userLogoutRequest,
  userLogoutSuccess,
  userLogoutFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetAuthState,
} = authSlice.actions;
