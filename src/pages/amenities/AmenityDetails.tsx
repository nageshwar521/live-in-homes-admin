import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { AmenityItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchSchema, amenitySchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, noop } from "lodash";
import { AmenityDetailsProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchLocationListRequest } from "../../store/slices/locationSlice";
import {
  getCategoriesDropdownList,
  getLocationsDropdownList,
} from "../../utils/common";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Box from "@mui/material/Box";

const defaultValues: AmenityItem = {
  amenity_name: "",
  amenity_description: "",
};

const AmenityDetails: React.FC<AmenityDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    amenityList,
    errorResponse,
    status: addAmenityStatus,
  } = useAppSelector((state) => state.amenities);
  const { categoryList } = useAppSelector((state) => state.categories);
  console.log(addAmenityStatus, "addAmenityStatus");
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<AmenityItem, UseFormProps> = useForm<AmenityItem>({
    values: formData,
    resolver: yupResolver(amenitySchema),
  });

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  useEffect(() => {
    if (addAmenityStatus === "success") {
      resetForm();
    }
  }, [addAmenityStatus]);

  const categoryOptions = getCategoriesDropdownList(categoryList);

  const submitForm = (data: AmenityItem) => {
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
          <TextInput
            name="amenity_name"
            label="Name"
            placeholder="Enter Name"
          />
          <TextInput
            name="amenity_description"
            label="Description"
            placeholder="Enter Description"
          />
          <SelectInput
            name="amenity_category"
            label="Category"
            placeholder="Select Category"
            options={categoryOptions}
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

export default AmenityDetails;
