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

interface RadioItem {
  label: string;
  name?: string;
  value: string;
  data?: any;
}

export interface RadioInputProps extends InputProps {
  label: string;
  fieldWrapperClass?: string;
  options?: RadioItem[];
}

const defaultOptions: RadioItem[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const RadioInput = ({
  name,
  label,
  fieldWrapperClass,
  options = defaultOptions,
}: RadioInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: name,
    control,
  });

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <FormLabel>{label}</FormLabel>
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
              {options.map((option: RadioItem) => {
                return (
                  <StyledFormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          }
        />
      </FormControl>
    </FieldWrapper>
  );
};
