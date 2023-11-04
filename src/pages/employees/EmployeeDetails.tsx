import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { EmployeeItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, isEmpty, noop } from "lodash";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchCafeListRequest } from "../../store/slices/cafeSlice";
import {
  generateEmployeeFormData,
  getCafesDropdownList,
} from "../../utils/common";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Row from "../../components/layout/Row";
import { fetchEmployeeListRequest } from "../../store/slices/employeeSlice";
import Box from "@mui/material/Box";
import { RadioInput } from "../../components/form/RadioInput";
import { DateInput } from "../../components/form/DateInput";
import { EmployeeDetailsProps } from "./types";

const defaultValues: EmployeeItem = {
  first_name: "",
  last_name: "",
  phone_number: "",
  gender: "",
  address: "",
  start_date: "",
  email_address: "",
  cafe: "",
};

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    cafeList,
    status: cafeApiStatus,
    errorResponse,
  } = useAppSelector((state) => state.cafes);
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<EmployeeItem, UseFormProps> = useForm<EmployeeItem>(
    {
      values: formData,
      resolver: yupResolver(employeeSchema),
    }
  );

  // console.log(form, "form");

  const cafeOptions = getCafesDropdownList(cafeList);

  useEffect(() => {
    dispatch(fetchCafeListRequest({}));
    dispatch(fetchEmployeeListRequest({}));
  }, []);

  useEffect(() => {
    if (isEmpty(errorResponse)) {
      form.reset({});
    }
  }, [JSON.stringify(errorResponse)]);

  const submitForm = (form: EmployeeItem) => {
    // console.log(form);
    onSubmit(form);
  };

  const resetForm = () => {
    form.reset({});
    onClose();
  };

  // console.log(rowDetails, "rowDetails");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div>
          <TextInput
            name="first_name"
            label="First Name"
            placeholder="Enter First Name"
          />
          <TextInput
            name="last_name"
            label="Last Name"
            placeholder="Enter Last Name"
          />
          <TextInput
            name="email_address"
            label="Email Address"
            placeholder="Enter Email Address"
          />
          <TextInput
            name="phone_number"
            label="Phone Number"
            placeholder="Enter Phone Number"
          />
          <TextInput
            name="address"
            label="Address"
            placeholder="Enter Address"
          />
          <RadioInput name="gender" label="Gender" placeholder="Enter Gender" />
          <DateInput
            name="start_date"
            label="Start Date"
            placeholder="Select Start Date"
          />
          <SelectInput
            name="cafe"
            label="Cafe"
            placeholder="Select Cafe"
            options={cafeOptions}
          />
        </div>

        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <BaseButton boxProps={{ marginRight: "10px" }} onClick={resetForm}>
            Cancel
          </BaseButton>
          <BaseButton type="submit" variant="contained">
            {mode === "create" ? "Submit" : "Update"}
          </BaseButton>
        </Box>
      </form>
    </FormProvider>
  );
};

export default EmployeeDetails;
