import React from "react";

import FieldContainer from "./FieldContainer";
import { InputProps } from "./TextInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";

export interface PasswordInputProps extends InputProps {
  label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <FieldContainer>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Input
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          {...props}
        />
      </FormControl>
    </FieldContainer>
  );
};

export default PasswordInput;
