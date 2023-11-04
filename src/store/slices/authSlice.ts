import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { cookies } from "../../utils/cookies";

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
      state.status = "userSignup";
    },
    userSignupSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.success = true;
      state.signupResponse = payload.data;
      state.message = payload.message;
    },
    userSignupFailed: (state, { payload }) => {
      state.status = "error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    userLoginRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "userLogin";
    },
    userLoginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.success = true;
      state.loginResponse = payload.data;
      state.message = payload.message;
      cookies.setCookie({ accessToken: payload.data.accessToken });
      cookies.setCookie({ refreshToken: payload.data.refreshToken });
      cookies.setCookie({ expiresIn: payload.data.expiresIn });
    },
    userLoginFailed: (state, { payload }) => {
      state.status = "error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    userLogoutRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "userLogout";
    },
    userLogoutSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.success = true;
      state.loginResponse = initialState.loginResponse;
      state.message = payload.message;
      cookies.removeCookie({ accessToken: "" });
      cookies.removeCookie({ refreshToken: "" });
      cookies.removeCookie({ expiresIn: "" });
    },
    userLogoutFailed: (state, { payload }) => {
      state.status = "error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    resetPasswordRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "resetPassword";
    },
    resetPasswordSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.success = true;
      state.resetPasswordResponse = payload.data;
      state.message = payload.message;
    },
    resetPasswordFailed: (state, { payload }) => {
      state.status = "error";
      state.success = false;
      state.errorResponse = payload.error;
      state.message = payload.message;
      toast.error(payload.message);
    },
    forgotPasswordRequest: (state, { payload }: PayloadAction<any>) => {
      state.status = "forgotPassword";
    },
    forgotPasswordSuccess: (state, { payload }: PayloadAction<any>) => {
      state.status = "success";
      state.success = true;
      state.forgotPasswordResponse = payload.data;
      state.message = payload.message;
    },
    forgotPasswordFailed: (state, { payload }) => {
      state.status = "error";
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
