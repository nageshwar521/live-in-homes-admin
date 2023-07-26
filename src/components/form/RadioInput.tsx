import React from "react";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { InputProps } from "./TextInput";
import FieldWrapper from "./FieldWrapper";
import styled from "@emotion/styled";

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: 0 !important;
`;

export interface RadioInputProps extends InputProps {
  fieldWrapperClass?: string;
}

export const RadioInput = ({ name, label, fieldWrapperClass }: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: name,
    control,
  });

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <FormLabel>Gender</FormLabel>
        <FormControlLabel
          label={""}
          control={
            <RadioGroup
              row
              onChange={controller.field.onChange}
              onBlur={controller.field.onBlur}
              name={controller.field.name}
              value={controller.field.value}
              ref={controller.field.ref}
            >
              <StyledFormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          }
        />
      </FormControl>
    </FieldWrapper>
  );
};
