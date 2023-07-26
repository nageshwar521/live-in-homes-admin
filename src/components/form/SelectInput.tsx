import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { InputProps } from "./TextInput";
import FieldWrapper from "./FieldWrapper";

export interface SelectInputOption {
  value: string;
  title: string;
}

export interface SelectInputProps extends InputProps {
  options: SelectInputOption[];
  fieldWrapperClass?: string;
}

export const SelectInput = ({
  label,
  placeholder,
  name,
  options,
  fieldWrapperClass,
}: SelectInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name,
    control,
  });

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          variant="outlined"
          id={name}
          label={label}
          placeholder={placeholder}
          onChange={controller.field.onChange}
          onBlur={controller.field.onBlur}
          name={controller.field.name}
          value={controller.field.value}
          ref={controller.field.ref}
        >
          {options.map((option: SelectInputOption) => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FieldWrapper>
  );
};
