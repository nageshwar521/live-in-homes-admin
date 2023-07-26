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
