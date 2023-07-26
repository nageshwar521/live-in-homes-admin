import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { CafeItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { cafeSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, noop } from "lodash";
import { RowDetailsInterface } from "./CafeList";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchLocationListRequest } from "../../store/slices/locationSlice";
import {
  generateCafeFormData,
  getLocationsDropdownList,
} from "../../utils/common";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Box from "@mui/material/Box";

const defaultValues: CafeItem = {
  name: "",
  logoUrl: "",
  description: "",
  phone_number: "",
  address: "",
  location: "",
  pincode: "",
};

interface CafeDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}

const CafeDetails: React.FC<CafeDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const { locationList, status: locationApiStatus } = useAppSelector(
    (state) => state.locations
  );
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<CafeItem, UseFormProps> = useForm<CafeItem>({
    values: formData,
    resolver: yupResolver(cafeSchema),
  });

  // console.log(form, "form");

  const locationOptions = getLocationsDropdownList(locationList);

  useEffect(() => {
    dispatch(fetchLocationListRequest());
  }, []);

  // useEffect(() => {}, []);

  const submitForm = (form: CafeItem) => {
    console.log(form);
    onSubmit(form);
  };

  const resetForm = () => {
    form.reset({});
    onClose();
  };

  console.log(rowDetails, "rowDetails");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div>
          <TextInput name="name" label="Name*" placeholder="Enter Name" />
          <TextInput
            name="description"
            label="Description*"
            placeholder="Enter Description"
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
          <SelectInput
            name="location"
            label="Location*"
            placeholder="Select Location"
            options={locationOptions}
          />
          <TextInput
            name="pincode"
            label="Pincode"
            placeholder="Enter Pincode"
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

export default CafeDetails;
