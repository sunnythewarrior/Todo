import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
  Link,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signup } from "../../api"; // Make sure to import your signup API function
import { toast } from "react-toastify";
import "../../assets/css/customs.css";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number")
      .required("Mobile Number is Required"),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/, "Invalid password")
      .required("Password is Required"),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      // Use Axios to make the signup API call
      const response = await axios.post(signup, values);

      // Assuming your API returns a success status
      if (response.status === 200) {
        toast.success("Signup successful!");
        navigate("/"); // Redirect to the home page after successful signup
      } else {
        // Handle other status codes or response data accordingly
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} className="signup">
        <LockOutlinedIcon sx={{ mb: 1 }} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="fname"
                  autoFocus
                />
                <Grid item xs={12} className="error-message-container">
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-message"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
                <Grid item xs={12} className="error-message-container">
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-message"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Grid item xs={12} className="error-message-container">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  name="mobileNumber"
                  autoComplete="mobile"
                />
                <Grid item xs={12} className="error-message-container">
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="error-message"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid item xs={12} className="error-message-container">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Paper>
      <Box mt={5} />
    </Container>
  );
};

export default Signup;
