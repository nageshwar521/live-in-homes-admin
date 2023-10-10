import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import {
  LocalizationProvider,
  DatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FieldWrapper from "./FieldWrapper";
import { FormControl } from "@mui/material";
import { InputProps } from "./TextInput";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../constants";

export interface DateInputProps extends InputProps {
  fieldWrapperClass?: string;
  dateInputProps?: DatePickerProps<Date>;
}

export const DateInput = ({
  name,
  label,
  fieldWrapperClass,
  dateInputProps,
}: DateInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: name,
    control,
  });

  console.log(controller.field.value);

  return (
    <FieldWrapper className={fieldWrapperClass}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={dayjs(controller.field.value).toDate()}
            onChange={(selectedDate: Date | null) => {
              controller.field.onChange(
                dayjs(selectedDate).format(dateInputProps?.format)
              );
            }}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                error: !!controller.fieldState.error,
                helperText: controller.fieldState.error?.message,
              },
            }}
            {...dateInputProps}
          />
        </LocalizationProvider>
      </FormControl>
    </FieldWrapper>
  );
};
