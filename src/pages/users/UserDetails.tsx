import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { UserItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, isEmpty, noop } from "lodash";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchUserListRequest } from "../../store/slices/userSlice";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Row from "../../components/layout/Row";
import Box from "@mui/material/Box";
import { RadioInput } from "../../components/form/RadioInput";
import { DateInput } from "../../components/form/DateInput";
import { UserDetailsProps } from "./types";

const defaultValues: UserItem = {
  first_name: "",
  last_name: "",
  phone_number: "",
  gender: "",
  address: "",
  email_address: "",
};

const UserDetails: React.FC<UserDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    userList,
    status: userApiStatus,
    errorResponse,
  } = useAppSelector((state) => state.users);
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<UserItem, UseFormProps> = useForm<UserItem>({
    values: formData,
    resolver: yupResolver(userSchema),
  });

  // console.log(form, "form");

  useEffect(() => {
    dispatch(fetchUserListRequest({}));
    dispatch(fetchUserListRequest({}));
  }, []);

  useEffect(() => {
    if (isEmpty(errorResponse)) {
      form.reset({});
    }
  }, [JSON.stringify(errorResponse)]);

  const submitForm = (form: UserItem) => {
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
            label="First Name*"
            placeholder="Enter First Name"
          />
          <TextInput
            name="last_name"
            label="Last Name*"
            placeholder="Enter Last Name"
          />
          <TextInput
            name="email_address"
            label="Email Address*"
            placeholder="Enter Email Address"
          />
          <TextInput
            name="phone_number"
            label="Phone Number*"
            placeholder="Enter Phone Number"
          />
          <TextInput
            name="address"
            label="Address"
            placeholder="Enter Address"
          />
          <RadioInput name="gender" label="Gender" placeholder="Enter Gender" />
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

export default UserDetails;
