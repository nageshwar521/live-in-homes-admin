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
import { resetPasswordSchema } from "../../../utils/validation";
import { ResetPasswordFormData } from "./types";
import { resetPasswordRequest } from "../../../store/slices/authSlice";
import AuthContainer from "../AuthContainer";

const defaultValues: ResetPasswordFormData = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: resetPasswordStatus,
    message: authMessage,
    success: resetPasswordSuccess,
    errorResponse: resetPasswordError,
    resetPasswordResponse: resetPasswordResponse,
  } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!resetPasswordSuccess) {
      setError(authMessage);
    }
  }, [JSON.stringify(resetPasswordStatus)]);

  const form: UseFormReturn<ResetPasswordFormData, UseFormProps> =
    useForm<ResetPasswordFormData>({
      values: defaultValues,
      resolver: yupResolver(resetPasswordSchema),
    });

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  const submitForm = (data: ResetPasswordFormData) => {
    console.log(data, "data");
    dispatch(resetPasswordRequest(data));
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
                name="password"
                label="Password"
                placeholder="Enter password"
                inputType="password"
              />
              <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter confirm password"
                inputType="password"
              />
            </Grid>
          </CardContent>
          <CardActions>
            <BaseButton type="submit" variant="contained" color="primary">
              Forgot Password
            </BaseButton>
          </CardActions>
          <CardActions>
            <Link href="/login" underline="hover">
              Login
            </Link>
          </CardActions>
        </form>
      </FormProvider>
    </AuthContainer>
  );
};

export default ResetPassword;
