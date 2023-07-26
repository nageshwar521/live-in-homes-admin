import { FormControl, TextField, TextFieldProps } from "@mui/material";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import FieldWrapper from "./FieldWrapper";

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  textFieldProps?: TextFieldProps;
  fieldWrapperClass?: string;
}

export const TextInput = ({
  placeholder,
  name,
  label,
  textFieldProps = {},
  fieldWrapperClass = "",
}: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: name,
    control,
  });

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
          {...textFieldProps}
        />
      </FormControl>
    </FieldWrapper>
  );
};
