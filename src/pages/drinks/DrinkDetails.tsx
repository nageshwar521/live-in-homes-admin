import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { DrinkItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { drinkSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, isEmpty, noop } from "lodash";
import { useAppDispatch, useAppSelector } from "../../store";
import { TextInput } from "../../components/form/TextInput";
import BaseButton from "../../components/buttons/BaseButton";
import Box from "@mui/material/Box";
import { DrinkDetailsProps } from "./types";
import FileUpload from "../../components/form/FileUpload";
import { SelectInput } from "../../components/form/SelectInput";

const defaultValues: DrinkItem = {
  name: "",
  altName: "",
  imageUrl: "",
  description: "",
  price: "",
  category: "",
  label: "",
  discount: 0,
  discountType: "",
  quantity: 0,
  units: "",
};

const DrinkDetails: React.FC<DrinkDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    drinkList,
    status: drinkApiStatus,
    errorResponse,
  } = useAppSelector((state) => state.drinks);
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<DrinkItem, UseFormProps> = useForm<DrinkItem>({
    values: formData,
    resolver: yupResolver(drinkSchema),
  });

  const categoryOptions = getCategoriesDropdownList(locationList);

  // console.log(form, "form");

  useEffect(() => {
    dispatch(fetchDrinkListRequest({}));
  }, []);

  useEffect(() => {
    if (isEmpty(errorResponse)) {
      form.reset({});
    }
  }, [JSON.stringify(errorResponse)]);

  const submitForm = (form: DrinkItem) => {
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
          <TextInput name="name" label="Name*" placeholder="Enter Name" />
          <TextInput
            name="description"
            label="Description*"
            placeholder="Enter Description"
          />
          <TextInput name="price" label="Price*" placeholder="Enter Price" />
          <SelectInput
            name="category"
            label="Category*"
            placeholder="Select Category"
            options={categoryOptions}
          />
          <FileUpload
            name="imageUrl"
            label="Upload logo"
            placeholder="Choose logo..."
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

export default DrinkDetails;
