/** @format */

import React, { useState } from "react";
import axios from "axios";
import {
 TextField,
 Button,
 Container,
 Typography,
 Box,
 Alert,
} from "@mui/material";
import { baseUrl } from "./constant";

export default function Registration() {
 const [FirstName, setFirstName] = useState("");
 const [LastName, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const [loading, setLoading] = useState(false);

 const handleRegistration = async () => {
  setError("");
  setSuccess("");
  setLoading(true);

  try {
   const response = await axios.post(`${baseUrl}/api/Users/registration`, {
    FirstName,
    LastName,
    email,
    password,
    phoneNumber,
   });
   setSuccess(
    "Registration successful! Please check your email for verification.",
    console.log(response),
   );
  } catch (error) {
   console.log(error);
   setError("Registration failed. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <Container maxWidth="sm" sx={{ mt: 5 }}>
   <Box
    sx={{
     p: 3,
     boxShadow: 3,
     borderRadius: 2,
     bgcolor: "background.paper",
    }}
    component="form"
    noValidate
    autoComplete="off"
   >
    <Typography variant="h4" gutterBottom align="center">
     Registration{" "}
    </Typography>{" "}
    {error && (
     <Alert severity="error" sx={{ mb: 2 }}>
      {" "}
      {error}{" "}
     </Alert>
    )}{" "}
    {success && (
     <Alert severity="success" sx={{ mb: 2 }}>
      {" "}
      {success}{" "}
     </Alert>
    )}{" "}
    <TextField
     fullWidth
     label="First Name"
     value={FirstName}
     onChange={(e) => setFirstName(e.target.value)}
     margin="normal"
     variant="outlined"
     required
     label="First Name"
    />
    <TextField
     fullWidth
     label="Last Name"
     value={LastName}
     onChange={(e) => setLastName(e.target.value)}
     margin="normal"
     variant="outlined"
     required
     label="Last Name"
    />
    <TextField
     fullWidth
     label="Email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     margin="normal"
     variant="outlined"
     type="email"
     required
     label="Email"
    />
    <TextField
     fullWidth
     label="Password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     margin="normal"
     variant="outlined"
     type="password"
     required
     label="Password"
     inputProps={{ minLength: 6 }}
     helperText={
      <span style={{ color: "red" }}>
       Password must be at least 6 characters long.{" "}
      </span>
     }
    />{" "}
    <TextField
     fullWidth
     label="Phone Number"
     value={phoneNumber}
     onChange={(e) => setPhoneNumber(e.target.value)}
     margin="normal"
     variant="outlined"
     required
     label="Phone Number"
     inputProps={{ maxLength: 11, pattern: "[0-9]*" }}
     helperText={
      <span style={{ color: "red" }}>
       Phone number cannot be longer than 11 digits and must be numeric.{" "}
      </span>
     }
    />{" "}
    <Box textAlign="center" mt={3}>
     <Button
      variant="contained"
      color="primary"
      onClick={handleRegistration}
      disabled={loading}
     >
      {" "}
      {loading ? "Registering..." : "Register"}{" "}
     </Button>{" "}
    </Box>{" "}
   </Box>{" "}
  </Container>
 );
}
