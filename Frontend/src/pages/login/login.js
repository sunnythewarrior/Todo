import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Make API request using Axios
      const response = await axios.post("YOUR_API_LOGIN_ENDPOINT", values);

      // Handle the response as needed
      console.log("API Response:", response.data);

      // Reset form
      setSubmitting(false);
    } catch (error) {
      // Handle API errors
      console.error("API Error:", error.response?.data || error.message);
      setErrors({
        apiError: "Failed to log in. Please check your credentials.",
      });
      setSubmitting(false);
    }
  };

  const LoginForm = () => (
    <Form>
      <Field
        as={TextField}
        margin="normal"
        fullWidth
        label="Email"
        id="email"
        name="email"
        autoComplete="email"
        variant="outlined"
      />
      <ErrorMessage name="email" component="div" />

      <Field
        as={TextField}
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"
        variant="outlined"
      />
      <ErrorMessage name="password" component="div" />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Login
      </Button>

      <ErrorMessage name="apiError" component="div" />
    </Form>
  );

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <LockOutlinedIcon sx={{ mb: 1 }} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {LoginForm}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
