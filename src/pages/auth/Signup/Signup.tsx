import {
  CardContent,
  Typography,
  CardActions,
  Grid,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseButton from "../../../components/buttons/BaseButton";
import { TextInput } from "../../../components/form/TextInput";
import { useAppSelector } from "../../../store";
import { useNavigate } from "react-router-dom";
import { userSignupRequest } from "../../../store/slices/authSlice";
import ErrorContainer from "../../../components/display/ErrorContainer";
import { SignupFormData } from "./types";
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../../utils/validation";
import AuthContainer from "../AuthContainer";

const defaultValues: SignupFormData = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: authStatus,
    message: authMessage,
    success: signupSuccess,
    errorResponse: authError,
    signupResponse: authSuccess,
  } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string>("");

  console.log(signupSuccess, "signupSuccess");

  useEffect(() => {
    if (authStatus !== "initial" && !signupSuccess) {
      setError(authMessage);
    } else if (signupSuccess) {
      navigate("/");
    }
  }, [JSON.stringify(authStatus)]);

  const form: UseFormReturn<SignupFormData, UseFormProps> =
    useForm<SignupFormData>({
      values: defaultValues,
      resolver: yupResolver(signupSchema),
    });

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  const submitForm = (data: SignupFormData) => {
    console.log(data, "data");
    const { username, password } = data;
    dispatch(userSignupRequest({ username, password }));
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
              Signup
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
              <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter confirm password"
                inputType="password"
              />
            </Grid>
          </CardContent>
          <CardActions>
            <BaseButton type="submit" variant="contained">
              Signup
            </BaseButton>
          </CardActions>
          <CardActions>
            <Link href="/login" underline="hover">
              Already have an account? Login
            </Link>
          </CardActions>
        </form>
      </FormProvider>
    </AuthContainer>
  );
};

export default Signup;
