import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { InputProps } from "./TextInput";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FieldWrapper from "./FieldWrapper";
import { FormControl } from "@mui/material";

export interface DateInputProps extends InputProps {
  fieldWrapperClass?: string;
}

export const DateInput = ({
  name,
  label,
  fieldWrapperClass,
}: DateInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: name,
    control,
  });

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={controller.field.value}
            onChange={controller.field.onChange}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                error: !!controller.fieldState.error,
                helperText: controller.fieldState.error?.message,
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </FieldWrapper>
  );
};
