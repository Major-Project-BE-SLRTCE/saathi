import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout.component";
import { validationSchemaResetPassword } from "../../utils/validations";
import { resetPassword } from "../../utils/auth";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { auth } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    // if already logged in, redirect to dashboard
    if (auth.isLoggedIn) {
      navigate("/dashboard");
    }
  });

  document.title = "Reset Password - Saathi";

  const styles = { marginBottom: "24px" };

  const handleResetPassword = async (data) => {
    setSubmitting(true);

    const resetPasswordData = {
      password: data.password,
      token
    };

    console.log(resetPasswordData);

    const resetPasswordRes = await resetPassword(resetPasswordData);

    console.log(resetPasswordRes);

    if (resetPasswordRes.status === 200) {
      navigate("/login");
    } else {
      console.log(`Reset Password Error: ${resetPasswordRes.data.message}`);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      password: ""
    },
    validationSchema: validationSchemaResetPassword,
    onSubmit: async (values) => {
      handleResetPassword(values);
    }
  });

  return (
    <AuthLayout>
      <h1>Reset Password</h1>

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
          disabled={isSubmitting}>
          {!isSubmitting ? "Reset Password" : "Resetting password..."}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
