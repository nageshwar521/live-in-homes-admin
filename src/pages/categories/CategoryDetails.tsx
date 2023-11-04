import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { CategoryItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, noop } from "lodash";
import { CategoryDetailsProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../store";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Box from "@mui/material/Box";
import FileUpload from "../../components/form/FileUpload";

const defaultValues: CategoryItem = {
  category_name: "",
  category_description: "",
};

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    categoryList,
    errorResponse,
    status: addCategoryStatus,
  } = useAppSelector((state) => state.categories);
  console.log(addCategoryStatus, "addCategoryStatus");
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<CategoryItem, UseFormProps> = useForm<CategoryItem>(
    {
      values: formData,
      resolver: yupResolver(categorySchema),
    }
  );

  // console.log(form, "form");

  const resetForm = () => {
    form.reset(defaultValues, {
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
    // onClose();
  };

  useEffect(() => {
    if (addCategoryStatus === "addCategory") {
      resetForm();
    }
  }, [addCategoryStatus]);

  const submitForm = (data: CategoryItem) => {
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
            name="category_name"
            label="Name"
            placeholder="Enter Name"
          />
          <TextInput
            name="category_description"
            label="Description"
            placeholder="Enter Description"
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

export default CategoryDetails;
