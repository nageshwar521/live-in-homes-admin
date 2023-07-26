import React from "react";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { InputProps } from "./TextInput";

export const CheckboxInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <FormControl fullWidth>
      <FormControlLabel
        label={props.label}
        control={
          <Checkbox
            onChange={controller.field.onChange}
            onBlur={controller.field.onBlur}
            name={controller.field.name}
            value={controller.field.value}
            ref={controller.field.ref}
          />
        }
      />
    </FormControl>
  );
};
