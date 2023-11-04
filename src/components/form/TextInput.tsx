import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import FieldWrapper from "./FieldWrapper";
import ShowPasswordIcon from "@mui/icons-material/Visibility";
import HidePasswordIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import get from "lodash/get";

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  textFieldProps?: TextFieldProps;
  fieldWrapperClass?: string;
  inputType?: "password" | "";
}

export const TextInput = ({
  placeholder,
  name,
  label,
  textFieldProps = {},
  fieldWrapperClass = "",
  inputType = "",
}: InputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const controller: UseControllerReturn = useController({
    name: name,
    control,
  });

  const handlePasswordToggle = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  let passwordProps = {};

  if (inputType === "password") {
    passwordProps = {
      type: showPassword ? "text" : "password",
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordToggle}>
              {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
            </IconButton>
          </InputAdornment>
        ),
        ...get(textFieldProps, "InputProps", {}),
      },
    };
  }

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          placeholder={placeholder}
          label={label}
          onChange={controller.field.onChange}
          onBlur={controller.field.onBlur}
          name={controller.field.name}
          value={controller.field.value}
          ref={controller.field.ref}
          error={!!controller.fieldState.error}
          helperText={controller.fieldState.error?.message}
          {...passwordProps}
          {...textFieldProps}
        />
      </FormControl>
    </FieldWrapper>
  );
};
