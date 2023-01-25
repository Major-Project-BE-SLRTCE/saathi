import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { TextField, Button } from "@mui/material";

import { AlertNotification } from "../utils/Notifications";

import { resetPassword } from "../../utils/auth";

import "./css/reset-password.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  document.title = "Reset Password - Saathi";

  const validationSchema = yup.object({
    password: yup
      .string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be at most 20 characters"),
  });

  const handleResetPassword = async (values) => {
    setSubmitting(true);
    setOpenAlert(false);

    const resetPasswordRes = await resetPassword({
      password: values.password,
      token,
    });

    if (resetPasswordRes.status === 201) {
      navigate("/auth/login");
    } else {
      setMessage(resetPasswordRes.data.message);
      setOpenAlert(true);
    }

    setSubmitting(false);
  };

  const styles = {
    marginBottom: "24px",
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      handleResetPassword(values);
    },
  });

  return (
    <div className="auth">
      <span className="auth-title">Reset Password</span>

      <AlertNotification
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        severity="error"
        styles={styles}
        message={message}
      />

      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          required
          style={styles}
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          disabled={isSubmitting}
        />

        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "12px" }}
          type="submit"
          disabled={isSubmitting}
        >
          {!isSubmitting ? "Reset Password" : "Resetting password..."}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
