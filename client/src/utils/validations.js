import * as yup from "yup";

const validationSchema = yup.object({
  userType: yup.string().required("Required"),
  username: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters")
    .matches(
      /^[a-z0-9_.]*$/,
      "Only small alphabates, digits, underscore and dot is allowed"
    ),
  name: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(64, "Must be at most 64 characters"),
  email: yup
    .string()
    .required("Required")
    .email("Invalid email")
    .max(128, "Must be at most 128 characters"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at most 20 characters"),
});

export default validationSchema;
