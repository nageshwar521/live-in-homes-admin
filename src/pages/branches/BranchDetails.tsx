import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { CafeItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchSchema, cafeSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, noop } from "lodash";
import { BranchDetailsProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchLocationListRequest } from "../../store/slices/locationSlice";
import { getLocationsDropdownList } from "../../utils/common";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Box from "@mui/material/Box";
import FileUpload from "../../components/form/FileUpload";

const defaultValues: CafeItem = {
  name: "",
  logoUrl: "",
  description: "",
  phone_number: "",
  address: "",
  location: "",
  pincode: "",
};

const CafeDetails: React.FC<BranchDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    cafeList,
    errorResponse,
    status: addCafeStatus,
  } = useAppSelector((state) => state.cafes);
  console.log(addCafeStatus, "addCafeStatus");
  const { locationList, status: locationApiStatus } = useAppSelector(
    (state) => state.locations
  );
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<CafeItem, UseFormProps> = useForm<CafeItem>({
    values: formData,
    resolver: yupResolver(branchSchema),
  });

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  const locationOptions = getLocationsDropdownList(locationList);

  useEffect(() => {
    dispatch(fetchLocationListRequest());
  }, []);

  useEffect(() => {
    if (addCafeStatus === "addCafe") {
      resetForm();
    }
  }, [addCafeStatus]);

  const submitForm = (data: CafeItem) => {
    console.log(data, "data");
    onSubmit(data);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const onErrors = (errors: any) => {
    console.log(errors, "errors");
  };

  console.log(form.getValues(), "form");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm, onErrors)}>
        <div>
          <TextInput name="name" label="Name" placeholder="Enter Name" />
          <TextInput
            name="description"
            label="Description"
            placeholder="Enter Description"
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
          <SelectInput
            name="location"
            label="Location"
            placeholder="Select Location"
            options={locationOptions}
          />
          <TextInput
            name="pincode"
            label="Pincode"
            placeholder="Enter Pincode"
          />
          <FileUpload
            name="logoUrl"
            label="Upload logo"
            placeholder="Choose logo..."
          />
        </div>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <BaseButton boxProps={{ marginRight: "10px" }} onClick={handleCancel}>
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

export default CafeDetails;
