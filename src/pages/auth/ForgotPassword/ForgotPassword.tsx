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
import ErrorContainer from "../../../components/display/ErrorContainer";
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../../utils/validation";
import { ForgotPasswordFormData } from "./types";
import { forgotPasswordRequest } from "../../../store/slices/authSlice";
import AuthContainer from "../AuthContainer";

const defaultValues: ForgotPasswordFormData = {
  username: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: forgotPasswordStatus,
    message: authMessage,
    success: forgotPasswordSuccess,
    errorResponse: forgotPasswordError,
    forgotPasswordResponse: forgotPasswordResponse,
  } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (forgotPasswordStatus === "forgot_error") {
      setError(authMessage);
    } else if (forgotPasswordStatus === "forgot_success") {
      navigate("/auth/login");
    }
  }, [forgotPasswordStatus, authMessage]);

  const form: UseFormReturn<ForgotPasswordFormData, UseFormProps> =
    useForm<ForgotPasswordFormData>({
      values: defaultValues,
      resolver: yupResolver(passwordSchema),
    });

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  const submitForm = (data: ForgotPasswordFormData) => {
    console.log(data, "data");
    dispatch(forgotPasswordRequest(data));
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
              Forgot Password
            </Typography>
          </CardContent>
          <CardContent>
            {error ? <ErrorContainer message={error} type="error" /> : null}
          </CardContent>
          <CardContent>
            <Grid container direction="column">
              <TextInput
                name="username"
                label="Username or Email"
                placeholder="Enter username or email"
              />
            </Grid>
          </CardContent>
          <CardActions>
            <BaseButton type="submit" variant="contained" color="primary">
              Forgot Password
            </BaseButton>
          </CardActions>
          <CardActions>
            <BaseButton href="/auth/login">
              Remember your Password?
            </BaseButton>
          </CardActions>
        </form>
      </FormProvider>
    </AuthContainer>
  );
};

export default ForgotPassword;
