import {
  InputAdornment,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import FieldWrapper from "./FieldWrapper";
import ShowPasswordIcon from "@mui/icons-material/Visibility";
import HidePasswordIcon from "@mui/icons-material/VisibilityOff";
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from "react-hook-form";

export interface CreatePasswordInputData {
  password?: string;
  confirmPassword?: string;
}

export interface CreatePasswordInputProps extends CreatePasswordInputData {
  register: any;
  watch: any;
}

const CreatePasswordInput: React.FC<CreatePasswordInputProps> = ({
  register,
  watch,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { control } = useFormContext();
  const passwordRef = useRef<any>({});
  passwordRef.current = watch("password", "");

  const handlePasswordToggle = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const passwordProps = {
    type: showPassword ? "text" : "password",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handlePasswordToggle}>
            {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  return (
    <Fragment>
      <FieldWrapper>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            placeholder="Enter password"
            {...register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            {...passwordProps}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter confirm password"
            {...register({
                validate: value =>
                  value === passwordRef.current || "The passwords do not match"
              })}
            {...passwordProps}
          />
        </FormControl>
      </FieldWrapper>
    </Fragment>
  );
};

export default CreatePasswordInput;
