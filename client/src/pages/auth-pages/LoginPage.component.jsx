import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { validationSchemaLogin } from "../../utils/validations";
import { login } from "../../utils/auth";
import useAxios from "../../hooks/useAxios";
const LoginPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if (auth.user) {
      navigate("/dashboard");
    }
  }, [auth.user, navigate]);

  const styles = { marginBottom: "24px" };

  const handleLogin = async (data) => {
    setSubmitting(true);

    const loginData = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password
    };

    const loginRes = await axios.post("/api/auth/login", loginData);
    if (loginRes.status === 200) {
      setAuth({
        accessToken: loginRes.data.accessToken,
        user: loginRes.data.user
      });
      navigate("/dashboard");
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
    <>
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
    </>
  );
};

export default LoginPage;
