import { React, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/login/login";
import Home from "./pages/components/Home";
import ForgotPassword from "./pages/login/forgotPassword";
import Signup from "./pages/registration/singup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyUser } from "./api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Retrieve the token from the cookie
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1];
        console.log("Token from Cookie:", token);

        console.log("token", token);

        // Set the token as a default header for all axios requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Make a request to verify the token
        const response = await axios.post(
          "http://localhost:8080/api/users/verifyToken"
        );

        console.log("response", response);

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/" />}
      />
      {/* other routes */}
    </Routes>
  );
}

export default App;
