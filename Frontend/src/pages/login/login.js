import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signin } from "../../api";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../assets/css/customs.css";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const [disableButton, setDisableButton] = useState(false);

  const [passwordTypeNew, setPasswordTypeNew] = useState("password");
  const togglePasswordNew = () => {
    if (passwordTypeNew === "password") {
      setPasswordTypeNew("text");
      return;
    }
    setPasswordTypeNew("password");
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post(signin, values);

      if (res?.data?.success === false) {
        toast.error(res?.data?.message);
        setDisableButton(false);
      }

      if (res?.data?.success === true) {
        toast.success(res?.data?.message);

        setDisableButton(false);

        // Store the token and tokenData in cookies with a 30-minute expiration
        document.cookie = `token=${res?.data?.data?.token}; max-age=${30 * 60}`;
        document.cookie = `tokenData=${JSON.stringify(
          res?.data?.data?.tokenData
        )}; max-age=${30 * 60}`;

        // Navigate to the home page after the timer finishes
        setTimeout(() => {
          navigate(`/home`);
        });
      }
    } catch (error) {
      setErrors({
        apiError: "Failed to log in. Please check your credentials.",
      });
      setSubmitting(false);
    }
  };

  const LoginForm = ({ errors, touched }) => (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            as={TextField}
            fullWidth
            label="Email"
            id="email"
            name="email"
            autoComplete="email"
            variant="outlined"
            helperText={<ErrorMessage name="email" />}
            error={Boolean(errors.email) && touched.email}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            as={TextField}
            fullWidth
            label="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Box
                  component="span"
                  className="input-icon"
                  position="end"
                  onClick={togglePasswordNew}
                  style={{ cursor: "pointer" }}
                >
                  {passwordTypeNew === "password" ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </Box>
              ),
            }}
            helperText={<ErrorMessage name="password" />}
            error={Boolean(errors.password) && touched.password}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" alignItems="end">
        <Link href="/forgot-password" variant="body2" className="forgot">
          Forgot password?
        </Link>
      </Box>
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "16px", // Adjust the padding as needed
        }}
        onClick={() => {
          // Your sign-in logic here
        }}
      >
        <Button
          className="signupbutton"
          type="submit"
          fullWidth
          disabled={disableButton}
        >
          {disableButton === true ? "Processing..." : "Sign In"}
        </Button>
      </div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography color="#929495">
          {" "}
          Don't have an account?&nbsp;
          <Link href="/signup" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Box>
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
