import * as yup from "yup";
import "yup-phone";

export const cafeSchema = yup.object().shape({
  name: yup.string().required().min(2).max(120).label("Name"),
  description: yup.string().min(2).max(2000).label("Description"),
  phone_number: yup.string().required().phone().label("Phone Number"),
  address: yup.string().label("Address"),
  location: yup.string().required().label("Location"),
  pincode: yup.string().label("Pincode"),
});

export const employeeSchema = yup.object().shape({
  first_name: yup.string().required().min(2).max(120).label("First Name"),
  last_name: yup.string().required().min(2).max(120).label("Last Name"),
  phone_number: yup.string().required().phone().label("Phone Number"),
  start_date: yup.date().required().label("Start Date"),
  gender: yup.string().label("Gender"),
  address: yup.string().label("Address"),
  role: yup.string().label("Role"),
  cafe: yup.string().required().label("Cafe"),
  email_address: yup.string().email().required().label("Email Address"),
});

export const userSchema = yup.object().shape({
  first_name: yup.string().min(2).max(120).label("First Name").nullable(),
  last_name: yup.string().min(2).max(120).label("Last Name").nullable(),
  phone_number: yup.string().required().phone().label("Phone Number"),
  gender: yup.string().label("Gender").nullable(),
  address: yup.string().label("Address").nullable(),
  role: yup.string().label("Role").nullable(),
  email_address: yup.string().email().required().label("Email Address"),
  username: yup.string().label("Username").nullable(),
});

export const drinkSchema = yup.object().shape({
  first_name: yup.string().required().min(2).max(120).label("First Name"),
  last_name: yup.string().required().min(2).max(120).label("Last Name"),
  phone_number: yup.string().required().phone().label("Phone Number"),
  start_date: yup.date().required().label("Start Date"),
  gender: yup.string().label("Gender"),
  address: yup.string().label("Address"),
  role: yup.string().label("Role"),
  email_address: yup.string().email().required().label("Email Address"),
});

export const branchSchema = yup.object().shape({
  first_name: yup.string().required().min(2).max(120).label("First Name"),
  last_name: yup.string().required().min(2).max(120).label("Last Name"),
  phone_number: yup.string().required().phone().label("Phone Number"),
  start_date: yup.date().required().label("Start Date"),
  gender: yup.string().label("Gender"),
  address: yup.string().label("Address"),
  role: yup.string().label("Role"),
  email_address: yup.string().email().required().label("Email Address"),
});

export const amenitySchema = yup.object().shape({
  amenity_name: yup.string().required().min(2).max(120).label("Amenity Name"),
  amenity_description: yup.string().max(120).label("Amenity Description"),
});

export const categorySchema = yup.object().shape({
  category_name: yup.string().required().min(2).max(120).label("Category Name"),
  category_description: yup.string().max(120).label("Category Description"),
});

export const conditionSchema = yup.object().shape({
  condition_name: yup
    .string()
    .required()
    .min(2)
    .max(120)
    .label("Condition Name"),
  condition_description: yup.string().label("Condition Description"),
});

export const postSchema = yup.object().shape({
  title: yup.string().required().min(2).max(120).label("Title"),
  description: yup.string().max(120).label("Description"),
  phone_number: yup.string().label("Phone Number"),
  pincode: yup.string().label("Pincode"),
  address: yup.string().required().label("Address"),
  rent: yup.string().required().label("Rent"),
  status: yup.string().required().label("Status"),
  avail_from: yup.string().required().label("Availability"),
  room_type: yup.string().required().label("Room Type"),
  amenities: yup.array().label("Amenities"),
  categories: yup.string().label("Categories"),
  conditions: yup.array().label("Conditions"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
});

export const forgotPasswordSchema = yup.object().shape({
  username: yup.string().required().label("Email"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required().label("Password"),
  confirmPassword: yup.string().required().label("Confirm Password"),
});

export const signupSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
  confirmPassword: yup.string().required().label("Confirm Password"),
});
