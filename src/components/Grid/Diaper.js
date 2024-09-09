/** @format */

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MedicineCard from "./MedicineCard";
import diaper1 from "../../assets/diaper1.png";

const Item = styled(Paper)(({ theme }) => ({
 backgroundColor: "#fff",
 ...theme.typography.body2,
 padding: theme.spacing(2),
 textAlign: "center",
 color: theme.palette.text.secondary,
}));

const diaperMedicines = [
 {
  id: 1,
  name: "Diaper A",
  dosage: "30 units",
  ingredient: "Polymer Gel, Cotton",
  company: "Diaper Inc.",
  price: 10.0,
  discount: 5,
  image: "/assets/diaper1.png",
 },
 {
  id: 2,
  name: "Diaper B",
  dosage: "50 units",
  ingredient: "Super Absorbent Polymer",
  company: "BabyCare Ltd.",
  price: 15.0,
  discount: 10,
  image: "diaper1.png",
 },
 // Add more diaper medicines as needed
];

export default function Diaper() {
 return (
  <Box sx={{ flexGrow: 1 }}>
   <Grid container spacing={3}>
    {" "}
    {diaperMedicines.map((medicine) => (
     <Grid item xs={12} sm={6} md={4} key={medicine.id}>
      <Item>
       <MedicineCard medicine={medicine} />{" "}
      </Item>{" "}
     </Grid>
    ))}{" "}
   </Grid>{" "}
  </Box>
 );
}
