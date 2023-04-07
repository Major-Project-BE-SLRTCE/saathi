import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import InputIcon from "@mui/icons-material/Input";
import useAuth from "../../../hooks/useAuth";
import { validationSchemaLogin } from "../../../utils/validations";
import { login } from "../../../utils/auth";
import useAxios from "../../../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
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

  const handleLogin = async (data) => {
    setSubmitting(true);
    const loginData = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password
    };
    try {
      const loginRes = await axios.post("/api/auth/login", loginData);
      console.log("loginRes: ", loginRes);
      setAuth({
        accessToken: loginRes.data.accessToken,
        user: loginRes.data.user
      });
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      setAuth({});
      setSubmitting(false);
      toast.error("Something went wrong");
      console.log("error: ", error);
    }
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
    <AnimatePresence>
      <Grid
        container
        spacing={2}
        sx={{
          px: 8,
          mt: 8
        }}>
        <Grid
          item
          xs={4}
          sx={{
            display: "grid",
            placeItems: "center"
          }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}>
            <Typography
              variant="h2"
              sx={{
                color: "secondary.light",
                display: "grid",
                gridTemplateColumns: "max-content max-content",
                gap: "2rem",
                alignItems: "center"
              }}>
              <LoginIcon fontSize="10rem" />
              Login
            </Typography>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            placeItems: "center",
            display: "grid"
          }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.2, ease: "easeOut" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    color="secondary"
                    fullWidth
                    required
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
                      formik.touched.usernameOrEmail &&
                      formik.errors.usernameOrEmail
                    }
                    disabled={isSubmitting}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    color="secondary"
                    required
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={<InputIcon />}
                    sx={{
                      width: "10rem"
                    }}>
                    {!isSubmitting ? (
                      <Typography>Login</Typography>
                    ) : (
                      <Typography>
                        <CircularProgress size={10} color="secondary" />
                      </Typography>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </motion.div>
        </Grid>
      </Grid>
    </AnimatePresence>
  );
};

export default LoginPage;
