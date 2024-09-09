/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./constant";
import {
 Container,
 Typography,
 TextField,
 Button,
 Alert,
 Box,
 Link,
 CircularProgress,
 InputAdornment,
} from "@mui/material";

export default function Login() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");
 const [otp, setOtp] = useState("");
 const [error, setError] = useState("");
 const [successMessage, setSuccessMessage] = useState("");
 const [loading, setLoading] = useState(false);
 const [otpSent, setOtpSent] = useState(false);
 const navigate = useNavigate();

 const handleLogin = async () => {
  setLoading(true);
  setError("");
  setSuccessMessage("");

  try {
   const response = await axios.post(`${baseUrl}/api/Users/login`, {
    email,
    password,
   });

   setSuccessMessage("Login successful! Redirecting...");
   setTimeout(() => {
    navigate("/dashboard");
   }, 2000);
  } catch (error) {
   if (error.response && error.response.status === 401) {
    setError("Invalid credentials. Please check your email and password.");
   } else if (error.response && error.response.status === 404) {
    setError("User not found. Redirecting to registration...");
    setTimeout(() => {
     navigate("/registration");
    }, 2000);
   } else {
    setError("An unexpected error occurred. Please try again later.");
   }
  } finally {
   setLoading(false);
  }
 };

 const handleOtpRequest = async () => {
  setLoading(true);
  setError("");
  setSuccessMessage("");

  try {
   // Call API to send OTP
   await axios.post(`${baseUrl}/api/Users/send-otp`, {
    phone,
   });

   setOtpSent(true);
   setSuccessMessage("OTP sent to your phone. Please check your SMS.");
  } catch (error) {
   setError("Failed to send OTP. Please try again later.");
  } finally {
   setLoading(false);
  }
 };

 const handleOtpVerification = async () => {
  setLoading(true);
  setError("");
  setSuccessMessage("");

  try {
   // Call API to verify OTP
   await axios.post(`${baseUrl}/api/Users/verify-otp`, {
    phone,
    otp,
   });

   setSuccessMessage("OTP verified successfully! Logging in...");
   setTimeout(() => {
    handleLogin();
   }, 2000);
  } catch (error) {
   setError("Invalid OTP. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 const handlePasswordReset = () => {
  navigate("/password-reset");
 };

 return (
  <Container maxWidth="sm" sx={{ mt: 8 }}>
   <Typography variant="h4" component="h1" gutterBottom>
    Login{" "}
   </Typography>{" "}
   <Box component="form" noValidate autoComplete="off">
    <TextField
     fullWidth
     label="Email"
     variant="outlined"
     margin="normal"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     error={!!error}
    />{" "}
    <TextField
     fullWidth
     label="Password"
     variant="outlined"
     margin="normal"
     type="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     error={!!error}
    />{" "}
    <TextField
     fullWidth
     label="Phone Number"
     variant="outlined"
     margin="normal"
     value={phone}
     onChange={(e) => setPhone(e.target.value)}
     InputProps={{
      startAdornment: <InputAdornment position="start"> +880 </InputAdornment>,
     }}
    />{" "}
    {otpSent && (
     <TextField
      fullWidth
      label="OTP"
      variant="outlined"
      margin="normal"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
     />
    )}{" "}
    {error && (
     <Alert severity="error" sx={{ mt: 2 }}>
      {" "}
      {error}{" "}
     </Alert>
    )}{" "}
    {successMessage && (
     <Alert severity="success" sx={{ mt: 2 }}>
      {" "}
      {successMessage}{" "}
     </Alert>
    )}{" "}
    <Box sx={{ mt: 3, position: "relative" }}>
     <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={otpSent ? handleOtpVerification : handleOtpRequest}
      disabled={loading}
     >
      {otpSent ? "Verify OTP" : "Send OTP"}{" "}
     </Button>{" "}
     {loading && (
      <CircularProgress
       size={24}
       sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-12px",
        marginLeft: "-12px",
       }}
      />
     )}{" "}
    </Box>{" "}
    {!otpSent && (
     <Box sx={{ mt: 2 }}>
      <Button
       fullWidth
       variant="contained"
       color="secondary"
       onClick={handleLogin}
       disabled={loading}
      >
       Login{" "}
      </Button>{" "}
     </Box>
    )}{" "}
    <Box sx={{ mt: 2 }}>
     <Link href="#" onClick={handlePasswordReset}>
      Forgot your password ? Reset Password{" "}
     </Link>{" "}
    </Box>{" "}
    <Box sx={{ mt: 2 }}>
     <Typography variant="body2">
      Don’ t have an account ? <Link href="/registration"> Register </Link>{" "}
     </Typography>{" "}
    </Box>{" "}
   </Box>{" "}
  </Container>
 );
}
