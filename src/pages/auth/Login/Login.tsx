import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "../../../components/buttons/BaseButton";
import { TextInput } from "../../../components/form/TextInput";
import { useAppSelector } from "../../../store";
import { useNavigate } from "react-router-dom";
import {
  resetAuthState,
  userLoginRequest,
} from "../../../store/slices/authSlice";
import ErrorContainer from "../../../components/display/ErrorContainer";
import { LoginFormData } from "./types";
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/validation";
import FlexGrow from "../../../components/FlexGrow";
import AuthContainer from "../AuthContainer";
import { fetchUserListRequest } from "../../../store/slices/userSlice";
import { fetchPostListRequest } from "../../../store/slices/postSlice";

const defaultValues: LoginFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: loginStatus,
    success: loginSuccess,
    message: authMessage,
    errorResponse: authError,
    loginResponse,
  } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string>("");

  console.log(loginStatus, "loginStatus");
  console.log(loginResponse, "loginResponse");

  useEffect(() => {
    if (loginStatus === "login_error") {
      setError(authMessage);
    } else if (loginStatus === "login_success" && loginResponse.accessToken) {
      dispatch(resetAuthState({ status: "initial" }));
      navigate("/admin");
    }
  }, [loginStatus, authMessage]);

  const form: UseFormReturn<LoginFormData, UseFormProps> =
    useForm<LoginFormData>({
      values: defaultValues,
      resolver: yupResolver(loginSchema),
    });

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  const submitForm = (data: LoginFormData) => {
    console.log(data, "data");
    dispatch(userLoginRequest(data));
  };

  const onErrors = (errors: any) => {
    console.log(errors, "errors");
  };

  return (
    <AuthContainer>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm, onErrors)}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Login
            </Typography>
          </CardContent>
          <CardContent>
            {error ? <ErrorContainer message={error} type="error" /> : null}
          </CardContent>
          <CardContent>
            <Grid container direction="column">
              <TextInput
                name="username"
                label="Username"
                placeholder="Enter username"
              />
              <TextInput
                name="password"
                label="Password"
                placeholder="Enter password"
                inputType="password"
              />
            </Grid>
          </CardContent>
          <CardActions>
            <BaseButton type="submit" variant="contained">
              Login
            </BaseButton>
          </CardActions>
          <CardActions>
            <BaseButton href="/auth/forgot-password">
              Forgot Password?
            </BaseButton>
            <FlexGrow />
            <BaseButton href="/auth/signup">
              Don't have an account? Sign up
            </BaseButton>
          </CardActions>
        </form>
      </FormProvider>
    </AuthContainer>
  );
};

export default Login;
