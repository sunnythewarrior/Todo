import React from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-z]).*$/,
        "Password must contain at least one uppercase letter, one special character, and one number"
      )
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Make API request to forgot password endpoint
        const response = await axios.put(forgotPassword, {
          email: values.email,
          newPassword: values.password,
        });

        if (response?.data?.success) {
          // Password recovery success
          // Redirect to login page or show a success message
          setTimeout(() => {
            navigate(`/`);
          });
        } else {
          formik.setFieldError(
            "password",
            "Failed to recover password. Please try again."
          );
        }
      } catch (error) {
        console.error("Error recovering password:", error);
        formik.setFieldError(
          "password",
          "An error occurred. Please try again later."
        );
      }
    },
  });

  const handleCancel = () => {
    // Handle cancel action, e.g., navigate to a different page
    navigate(`/`);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card style={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Forgot Password
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="error" variant="body2" paragraph>
                {formik.errors.email}
              </Typography>
            )}
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="error" variant="body2" paragraph>
                {formik.errors.password}
              </Typography>
            )}

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Button
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
                sx={{ mt: 2, color: "primary", width: "250px" }}
              >
                Update Password
              </Button>
              &nbsp;
              <Button
                variant="contained"
                onClick={handleCancel}
                sx={{ mt: 2, backgroundColor: "grey", width: "250px" }}
              >
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
