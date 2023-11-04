import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { ConditionItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { conditionSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, noop } from "lodash";
import { ConditionDetailsProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../store";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Box from "@mui/material/Box";
import FileUpload from "../../components/form/FileUpload";

const defaultValues: ConditionItem = {
  condition_name: "",
  condition_description: "",
};

const ConditionDetails: React.FC<ConditionDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const {
    conditionList,
    errorResponse,
    status: addConditionStatus,
  } = useAppSelector((state) => state.conditions);
  console.log(addConditionStatus, "addConditionStatus");
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<ConditionItem, UseFormProps> =
    useForm<ConditionItem>({
      values: formData,
      resolver: yupResolver(conditionSchema),
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
    if (addConditionStatus === "addCondition") {
      resetForm();
    }
  }, [addConditionStatus]);

  const submitForm = (data: ConditionItem) => {
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
            name="condition_name"
            label="Name"
            placeholder="Enter Name"
          />
          <TextInput
            name="condition_description"
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

export default ConditionDetails;
