import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, MenuItem, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { validationSchemaForgotPassword } from "../../utils/validations";
import { forgotPassword } from "../../utils/auth";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (auth.user) {
      navigate("/dashboard");
    }
  }, [auth.user, navigate]);

  document.title = "Forgot Password - Saathi";

  const styles = { marginBottom: "24px" };

  const handleForgotPassword = async (data) => {
    setSubmitting(true);

    const forgotPasswordData = {
      email: data.email,
      userType: data.userType
    };

    console.log(forgotPasswordData);

    const forgotPasswordRes = await forgotPassword(forgotPasswordData);

    console.log(forgotPasswordRes);

    if (forgotPasswordRes.status === 200) {
      console.log(forgotPasswordRes);
    } else {
      console.log(`Forgot Password Error: ${forgotPasswordRes.data.message}`);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      userType: ""
    },
    validationSchema: validationSchemaForgotPassword,
    onSubmit: async (values) => {
      handleForgotPassword(values);
    }
  });

  return (
    <>
      <h1>Forgot Password</h1>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          required
          style={styles}
          type="text"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={isSubmitting}
        />

        <TextField
          variant="standard"
          select
          fullWidth
          required
          style={styles}
          type="text"
          name="userType"
          label="You are"
          placeholder="Enter your userType"
          value={formik.values.userType}
          onChange={formik.handleChange}
          error={formik.touched.userType && Boolean(formik.errors.userType)}
          helperText={formik.touched.userType && formik.errors.userType}
          disabled={isSubmitting}>
          <MenuItem value="chatter">Patient</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
        </TextField>

        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "12px" }}
          type="submit"
          disabled={isSubmitting}>
          {!isSubmitting
            ? "Send Reset Password Link"
            : "Sending reset password link..."}
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
