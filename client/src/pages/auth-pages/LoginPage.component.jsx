import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout.component";
import { validationSchemaLogin } from "../../utils/validations";
import { login } from "../../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    // if already logged in, redirect to dashboard
    if (auth.isLoggedIn) {
      navigate("/dashboard");
    }
  });

  document.title = "Login - Saathi";

  const styles = { marginBottom: "24px" };

  const handleLogin = async (data) => {
    setSubmitting(true);

    const loginData = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password
    };

    console.log(loginData);

    const loginRes = await login(loginData);

    console.log(loginRes);

    if (loginRes.status === 200) {
      setAuth({
        ...auth,
        isLoggedIn: true,
        userId: loginRes.data.userId,
        name: loginRes.data.name,
        userType: loginRes.data.userType
      });

      navigate("/dashboard");
    } else {
      console.log(`Login Error: ${loginRes.data.message}`);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: ""
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      handleLogin(values);
    }
  });

  return (
    <AuthLayout>
      <h1>Login</h1>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          required
          style={styles}
          type="text"
          name="usernameOrEmail"
          label="Username or Email"
          placeholder="Enter your username or email"
          value={formik.values.usernameOrEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.usernameOrEmail &&
            Boolean(formik.errors.usernameOrEmail)
          }
          helperText={
            formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
          }
          disabled={isSubmitting}
        />

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
          {!isSubmitting ? "Login" : "Logging in..."}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
