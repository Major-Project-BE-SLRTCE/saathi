import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Autocomplete
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import InputIcon from "@mui/icons-material/Input";

import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

import { validationSchemaSignup } from "../../../utils/validations";
import { signup } from "../../../utils/auth";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if (auth.user) {
      navigate("/chat");
    }
  }, [auth.user, navigate]);
  const handleSignup = async (data) => {
    setSubmitting(true);

    const signupData = {
      name: data.name,
      username: data.username,
      email: data.email,
      userType: data.userType === "Patient" ? "chatter" : "doctor",
      password: data.password
    };

    try {
      // const signupRes = await signup(signupData)
      const signupRes = await axios.post("/api/user/create", signupData);
      console.log(signupRes);
      setSubmitting(false);
      toast.success("Registered sucessfully!\nLogin to continue.");
      navigate("/login");
    } catch (error) {
      setSubmitting(false);
      // console.error(error);
      const { message } = error.response.data;
      // check if message is an array
      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      userType: "",
      password: ""
    },
    validationSchema: validationSchemaSignup,
    onSubmit: async (values) => {
      handleSignup(values);
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
          xs={6}
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
                color: "secondary.contrastText",
                display: "grid",
                gridTemplateColumns: "max-content max-content",
                gap: "2rem",
                alignItems: "center"
              }}>
              <ForumIcon fontSize="10rem" />
              Sign Up
            </Typography>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={6}
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
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    color="primary"
                    fullWidth
                    required
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled={isSubmitting}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="primary"
                    fullWidth
                    required
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="primary"
                    fullWidth
                    required
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="primary"
                    select
                    fullWidth
                    required
                    type="text"
                    name="userType"
                    label="Type of user"
                    placeholder="Enter your userType"
                    value={formik.values.userType}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.userType && Boolean(formik.errors.userType)
                    }
                    helperText={
                      formik.touched.userType && formik.errors.userType
                    }
                    disabled={isSubmitting}>
                    <MenuItem value="chatter">Patient</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="primary"
                    fullWidth
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
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={<InputIcon />}
                    sx={{
                      width: "max(max-content, 10rem)"
                    }}>
                    {!isSubmitting ? (
                      <Typography>Create an account</Typography>
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

export default SignupPage;
