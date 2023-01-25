import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { TextField, MenuItem, Button } from "@mui/material";

import NotFound from "../utils/NotFound";
import { AlertNotification } from "../utils/Notifications";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

import { login, signup } from "../../utils/auth";
import "./css/auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const axios = useAxios();
  const { authType } = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [isSubmitting, setSubmitting] = useState(false);
  const authTypes = ["login", "signup", "forgot-password"];

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  });

  document.title = `${
    authType === "login"
      ? "Login"
      : authType === "signup"
      ? "Sign Up"
      : "Forgot Password"
  } - Saathi`;

  const validationSchemaSignup = yup.object({
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

  const validationSchemaLogin = yup.object({
    username: yup
      .string()
      .required("Required")
      .min(3, "Must be at least 3 characters")
      .max(128, "Must be at most 20 or 128 characters")
      .matches(
        /^[a-z0-9_.]*$/,
        "Only small alphabates, digits, underscore and dot is allowed"
      ),
    password: yup
      .string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be at most 20 characters"),
  });

  const validationSchemaForgotPassword = yup.object({
    userType: yup.string().required("Required"),
    email: yup
      .string()
      .required("Required")
      .email("Invalid email")
      .max(128, "Must be at most 128 characters"),
  });

  const handleSignup = async (data) => {
    setSubmitting(true);
    setOpenAlert(false);

    const signupData = {
      name: data.name,
      username: data.username,
      email: data.email,
      userType: data.userType,
      password: data.password,
    };

    const signupRes = await signup(signupData);

    if (signupRes.status === 201) {
      navigate("/auth/login");
    } else {
      setMessage(signupRes.data.message);
      setSeverity("error");
      setOpenAlert(true);
    }

    setSubmitting(false);
  };

  const handleLogin = async (data) => {
    setSubmitting(true);
    setOpenAlert(false);

    const loginData = {
      username: data.username,
      password: data.password,
    };

    const loginRes = await login(loginData);

    if (loginRes.status === 200) {
      setAuth({
        ...auth,
        isLoggedIn: true,
        userId: loginRes.data.userId,
        name: loginRes.data.name,
        userType: loginRes.data.userType,
      });
      navigate("/dashboard");
    } else {
      setMessage(loginRes.data.message);
      setSeverity("error");
      setOpenAlert(true);
    }

    setSubmitting(false);
  };

  const forgetPasswordMutation = useMutation(
    async (data) => {
      const res = await axios.put(`/password/forgot`, data);
      return res;
    },
    {
      onSuccess: (res) => {
        console.log(res);
        toast("Forget password email sent successfully");
        setSeverity("success");
        setMessage(res.data.message);
        setOpenAlert(true);
        setSubmitting(false);
      },
      onError: () => {
        toast("Error in sending forget password email");
        setSeverity("error");
      },
    }
  );

  const handleForgotPassword = async (data) => {
    setSubmitting(true);
    setOpenAlert(false);

    const forgotPasswordData = {
      email: data.email,
      userType: data.userType,
    };
    forgetPasswordMutation.mutate(forgotPasswordData);
    // const forgotPasswordRes = await forgotPassword(forgotPasswordData);

    // if (forgotPasswordRes.status === 200) {
    //   setSeverity("success");
    // } else {
    //   setSeverity("error");
    // }
  };

  const authModeChanged = () => {
    setOpenAlert(false);
  };

  const styles = {
    marginBottom: "24px",
  };

  const formik = useFormik({
    initialValues: {
      userType: "",
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema:
      authType === "login"
        ? validationSchemaLogin
        : authType === "signup"
        ? validationSchemaSignup
        : validationSchemaForgotPassword,
    onSubmit: async (values) => {
      authType === "login"
        ? handleLogin(values)
        : authType === "signup"
        ? handleSignup(values)
        : handleForgotPassword(values);
    },
  });

  if (authTypes.indexOf(authType) !== -1) {
    return (
      <div className="auth">
        <span className="auth-title m-title">
          {authType === "login"
            ? "Login"
            : authType === "signup"
            ? "Sign Up"
            : "Forgot Password"}
        </span>

        <AlertNotification
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          severity={severity}
          styles={styles}
          message={message}
        />

        <form onSubmit={formik.handleSubmit}>
          {authType === "signup" && (
            <TextField
              variant="standard"
              fullWidth
              required
              style={styles}
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={isSubmitting}
            />
          )}

          {authType !== "forgot-password" && (
            <TextField
              variant="standard"
              fullWidth
              required
              style={styles}
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              disabled={isSubmitting}
            />
          )}

          {authType !== "login" && (
            <>
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
                error={
                  formik.touched.userType && Boolean(formik.errors.userType)
                }
                helperText={formik.touched.userType && formik.errors.userType}
                disabled={isSubmitting}
              >
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </TextField>
            </>
          )}

          {authType !== "forgot-password" && (
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
          )}

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "12px" }}
            type="submit"
            disabled={isSubmitting}
          >
            {!isSubmitting
              ? authType === "login"
                ? "Login"
                : authType === "signup"
                ? "Sign Up"
                : "Send Password Reset Link"
              : authType === "login"
              ? "Logging in..."
              : authType === "signup"
              ? "Signing up..."
              : "Sending password reset link..."}
          </Button>
        </form>

        {authType === "login" ? (
          <>
            <Link
              className="auth-link"
              style={{ marginTop: "24px" }}
              to="/auth/signup"
              onClick={authModeChanged}
            >
              Don't have an account?
            </Link>
            <Link
              className="auth-link"
              style={{ marginTop: "8px" }}
              to="/auth/forgot-password"
              onClick={authModeChanged}
            >
              Forgot password?
            </Link>
          </>
        ) : (
          <Link
            className="auth-link"
            style={{ marginTop: "24px" }}
            to="/auth/login"
            onClick={authModeChanged}
          >
            Already have an account?
          </Link>
        )}
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default Auth;
