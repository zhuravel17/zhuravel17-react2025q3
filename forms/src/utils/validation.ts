import * as yup from "yup";
import { countries } from "../consts/countries";

export const passwordRegex = {
  number: /\d/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Z][a-zA-Z]*$/, "First letter must be uppercase"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(0, "Age cannot be negative"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(passwordRegex.number, "At least one number")
    .matches(passwordRegex.upper, "At lee letter")
    .matches(passwordRegex.lower, "At least one lowercase letter")
    .matches(passwordRegex.special, "At least one special character"),
  confirmPassword: yup
    .string()
    .required("Please confirm password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup.string().required("Gender is required"),
  terms: yup
    .boolean()
    .required("You must accept Terms & Conditions")
    .oneOf([true], "You must accept Terms & Conditions"),
  picture: yup
    .mixed<File>()
    .nullable()
    .required("Picture is required")
    .test("fileFormat", "Only PNG/JPEG allowed", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png"].includes(value.type);
    }),
  country: yup
    .string()
    .required("Country is required")
    .oneOf(countries, "Please select a valid country"),
});
