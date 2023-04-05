import * as yup from "yup";

export const validationSchemaSignup = yup.object({
  name: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(64, "Must be at most 64 characters"),
  username: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters")
    .matches(
      /^[a-z0-9_.]*$/,
      "Only small alphabates, digits, underscore and dot is allowed"
    ),
  email: yup
    .string()
    .required("Required")
    .email("Invalid email")
    .max(128, "Must be at most 128 characters"),
  userType: yup.string().required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at most 20 characters")
});

export const validationSchemaLogin = yup.object({
  usernameOrEmail: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(128, "Must be at most 20 or 128 characters"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at most 20 characters")
});

export const validationSchemaForgotPassword = yup.object({
  userType: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required")
    .email("Invalid email")
    .max(128, "Must be at most 128 characters")
});

export const validationSchemaResetPassword = yup.object({
  password: yup
    .string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at most 20 characters")
});
