import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import { PostItem } from "../../store/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "../../utils/validation";
import React, { useEffect, useState } from "react";
import { get, isEmpty, noop, uniqueId } from "lodash";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPostListRequest } from "../../store/slices/postSlice";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import BaseButton from "../../components/buttons/BaseButton";
import Row from "../../components/layout/Row";
import Box from "@mui/material/Box";
import { RadioInput } from "../../components/form/RadioInput";
import { DateInput } from "../../components/form/DateInput";
import { PostDetailsProps } from "./types";
import {
  getAmenitiesDropdownList,
  getCategoriesDropdownList,
  getConditionsDropdownList,
  getRoomtypesDropdownList,
} from "../../utils/common";
import { fetchAmenityListRequest } from "../../store/slices/amenitySlice";
import { fetchCategoryListRequest } from "../../store/slices/categorySlice";
import { fetchConditionListRequest } from "../../store/slices/conditionSlice";
import { DATE_API_FORMAT } from "../../constants";

export const defaultPostValues: PostItem = {
  title: "",
  photos: "",
  videos: "",
  description: "",
  phone_number: "",
  address: "",
  pincode: 0,
  rent: 0,
  status: "",
  avail_from: "",
  room_type: "",
  categories: "",
  amenities: "",
  conditions: "",
  user_id: uniqueId(),
};

const PostDetails: React.FC<PostDetailsProps> = ({
  onClose = noop,
  rowDetails = {},
  mode = "create",
  onSubmit = noop,
}) => {
  const dispatch = useAppDispatch();
  const { amenityList, status: amenityApiStatus } = useAppSelector(
    (state) => state.amenities
  );
  const { categoryList, status: categoryApiStatus } = useAppSelector(
    (state) => state.categories
  );
  const { conditionList, status: conditionApiStatus } = useAppSelector(
    (state) => state.conditions
  );
  const formData = get(rowDetails, "formData");
  const form: UseFormReturn<PostItem, UseFormProps> = useForm<PostItem>({
    defaultValues: defaultPostValues,
    values: formData,
    resolver: yupResolver(postSchema),
  });

  // console.log(form, "form");

  useEffect(() => {
    dispatch(fetchPostListRequest({}));
    dispatch(fetchAmenityListRequest({}));
    dispatch(fetchCategoryListRequest({}));
    dispatch(fetchConditionListRequest({}));
  }, []);

  const submitForm = (form: PostItem) => {
    console.log(form);
    onSubmit(form);
  };

  const resetForm = () => {
    form.reset({});
    onClose();
  };

  const roomTypeOptions = getRoomtypesDropdownList();
  const amenityOptions = getAmenitiesDropdownList(amenityList);
  const categoryOptions = getCategoriesDropdownList(categoryList);
  const conditionOptions = getConditionsDropdownList(conditionList);

  // console.log(rowDetails, "rowDetails");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <div>
          <TextInput name="title" label="Title*" placeholder="Enter Title" />
          <TextInput
            name="description"
            label="Description*"
            placeholder="Enter Description"
          />
          <TextInput
            name="pincode"
            label="Pin Code*"
            placeholder="Enter Pin Code"
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
          <TextInput name="rent" label="Rent*" placeholder="Enter Rent" />
          <RadioInput
            name="status"
            label="Status*"
            placeholder="Enter Status"
            options={[
              { label: "Open", value: "open" },
              { label: "Closed", value: "closed" },
            ]}
          />
          <DateInput
            name="avail_from"
            label="Availability"
            placeholder="Select Availability"
            dateInputProps={{
              format: DATE_API_FORMAT,
              disablePast: true,
            }}
          />
          <SelectInput
            name="room_type"
            label="Room Type*"
            placeholder="Select Room Type"
            options={roomTypeOptions}
          />
          <SelectInput
            name="amenities"
            label="Amenities*"
            placeholder="Select Amenities"
            options={amenityOptions}
          />
          <SelectInput
            name="categories"
            label="Categories*"
            placeholder="Select Categories"
            options={categoryOptions}
          />
          <SelectInput
            name="conditions"
            label="Conditions*"
            placeholder="Select Conditions"
            options={conditionOptions}
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

export default PostDetails;
