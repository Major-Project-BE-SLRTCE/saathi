import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, MenuItem, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { validationSchemaSignup } from "../../utils/validations";
import { signup } from "../../utils/auth";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (auth.user) {
      navigate("/dashboard");
    }
  }, [auth.user, navigate]);

  document.title = "Register - Saathi";

  const styles = { marginBottom: "24px" };

  const handleSignup = async (data) => {
    setSubmitting(true);

    const signupData = {
      name: data.name,
      username: data.username,
      email: data.email,
      userType: data.userType,
      password: data.password
    };

    console.log(signupData);

    const signupRes = await signup(signupData);

    console.log("signupRes", signupRes);

    if (signupRes.status === 201) {
      toast.success("Registered sucessfully!\nLogin to continue.");
      navigate("/login");
    } else if (signupRes.status === 400) {
      signupRes.data.message.forEach((error) => {
        toast.error(error);
      });
      console.log(`Sign Up Error: ${signupRes.data.message}`);
    }

    setSubmitting(false);
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
    <>
      <h1>Register</h1>

      <form onSubmit={formik.handleSubmit}>
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
          {!isSubmitting ? "Sign Up" : "Signing up..."}
        </Button>
      </form>
    </>
  );
};

export default SignupPage;
