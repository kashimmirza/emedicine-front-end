/** @format */

/*import React, { useState } from "react";
import {
 Container,
 TextField,
 Button,
 Grid,
 Typography,
 Paper,
} from "@mui/material";
import axios from "axios";

export default function AdminDashboard() {
 const [medicine, setMedicine] = useState({
  id: 0,
  name: "",
  manufacturer: "",
  unitPrice: "",
  discount: "",
  quantity: "",
  expDate: "",
  imageUrl: "",
  status: "",
  type: "",
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setMedicine((prevState) => ({
   ...prevState,
   [name]: value,
  }));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("hi");
  try {
   const response = await axios.post(
    "https://localhost:7266/api/Medicines/addUpdateMedicine",
    medicine,
   );
   alert("Medicine added/updated successfully!");
  } catch (error) {
   console.error("There was an error adding/updating the medicine!", error);
  }
 };
 const handleAddToCart = async () => {
  const cartData = {
   name: medicine.name,
   manufacturer: medicine.manufacturer,
   unitPrice: parseFloat(medicine.discount),
   discount: parseFloat(medicine.discount),
   quantity: parseInt(medicine.quantity, 10),
   expDate: medicine.expDate,
   imageUrl: medicine.imageUrl,
   status: parseInt(medicine, 10),
   type: medicine.type,
  };
  try {
   const response = await axios.post(
    "https://localhost:7266/api/Admin/addUpdateMedicine",
    cartData,
   );
   if (response.status === 200) {
    alert("Item added to cart successfully!");
   } else {
    alert("Failed to add item to cart.");
   }
  } catch (error) {
   console.error("error adding to cart", error);
  }
 };

 return (
  <Container maxWidth="md" className="mt-5">
   <Paper elevation={3} className="p-4">
    <Typography variant="h4" gutterBottom>
     Add or Update Medicine{" "}
    </Typography>{" "}
    <form onSubmit={handleSubmit}>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="name"
        label="Medicine Name"
        fullWidth
        value={medicine.name}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="manufacturer"
        label="Manufacturer"
        fullWidth
        value={medicine.manufacturer}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="unitPrice"
        label="Unit Price"
        type="number"
        fullWidth
        value={medicine.unitPrice}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="discount"
        label="Discount"
        type="number"
        fullWidth
        value={medicine.discount}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="quantity"
        label="Quantity"
        type="number"
        fullWidth
        value={medicine.quantity}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="expDate"
        label="Expiry Date"
        type="date"
        fullWidth
        value={medicine.expDate}
        onChange={handleChange}
        InputLabelProps={{
         shrink: true,
        }}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="imageUrl"
        label="Image URL"
        fullWidth
        value={medicine.imageUrl}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="status"
        label="Status"
        type="number"
        fullWidth
        value={medicine.status}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12}>
       <TextField
        required
        name="type"
        label="Type"
        fullWidth
        value={medicine.type}
        onChange={handleChange}
       />{" "}
      </Grid>{" "}
      <Grid item xs={12}>
       <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit{" "}
       </Button>{" "}
      </Grid>{" "}
     </Grid>{" "}
    </form>{" "}
   </Paper>{" "}
  </Container>
 );
}*/
/** @format */

import React, { useState } from "react";
import {
 Container,
 TextField,
 Button,
 Grid,
 Typography,
 Paper,
} from "@mui/material";
import axios from "axios";

export default function AdminDashboard() {
 const [medicine, setMedicine] = useState({
  id: 0,
  name: "",
  manufacturer: "",
  unitPrice: "",
  discount: "",
  quantity: "",
  expDate: "",
  imageUrl: "",
  status: "",
  type: "",
 });

 // Handle input changes
 const handleChange = (e) => {
  const { name, value } = e.target;
  setMedicine((prevState) => ({
   ...prevState,
   [name]: value,
  }));
 };

 // Handle form submission when the submit button is clicked
 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  console.log("Form submitted");

  // Parse necessary values into correct types before sending to server
  const parsedMedicine = {
   ...medicine,
   unitPrice: parseFloat(medicine.unitPrice),
   discount: parseFloat(medicine.discount),
   quantity: parseInt(medicine.quantity, 10),
   status: parseInt(medicine.status, 10),
  };

  try {
   const response = await axios.post(
    "https://localhost:7266/api/Admin/addUpdateMedicine",
    parsedMedicine,
    {
     headers: {
      "Content-Type": "application/json",
     },
    },
   );
   alert("Medicine added/updated successfully!");
   console.log(response);
  } catch (error) {
   console.error("There was an error adding/updating the medicine!", error);
   alert("Error adding/updating medicine. Please try again.");
   console.log(parsedMedicine);
  }
 };

 return (
  <Container maxWidth="md" className="mt-5">
   <Paper elevation={3} className="p-4">
    <Typography variant="h4" gutterBottom>
     Add or Update Medicine
    </Typography>

    {/* The form that handles submission */}
    <form onSubmit={handleSubmit}>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="name"
        label="Medicine Name"
        fullWidth
        value={medicine.name}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="manufacturer"
        label="Manufacturer"
        fullWidth
        value={medicine.manufacturer}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="unitPrice"
        label="Unit Price"
        type="number"
        fullWidth
        value={medicine.unitPrice}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="discount"
        label="Discount"
        type="number"
        fullWidth
        value={medicine.discount}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="quantity"
        label="Quantity"
        type="number"
        fullWidth
        value={medicine.quantity}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="expDate"
        label="Expiry Date"
        type="date"
        fullWidth
        value={medicine.expDate}
        onChange={handleChange}
        InputLabelProps={{
         shrink: true,
        }}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="imageUrl"
        label="Image URL"
        fullWidth
        value={medicine.imageUrl}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        required
        name="status"
        label="Status"
        type="number"
        fullWidth
        value={medicine.status}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        required
        name="type"
        label="Type"
        fullWidth
        value={medicine.type}
        onChange={handleChange}
       />
      </Grid>
      <Grid item xs={12}>
       {/* The submit button that triggers handleSubmit */}
       <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit
       </Button>
      </Grid>
     </Grid>
    </form>
   </Paper>
  </Container>
 );
}
