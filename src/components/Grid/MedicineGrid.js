/** @format */

import React from "react";
import "../styles/MedicineGrid.css";
import MedicineCard from "./MedicineCard";

const medicines = [
 {
  id: 1,
  name: "Sergel",
  dosage: "20mg",
  ingredient: "Esomeprazole Magnesium Trihydrate",
  company: "Healthcare Pharmaceuticals Ltd.",
  price: 6.44,
  discount: 8,
  image: "sergel.png", // Assume this is the image file name in your public directory
 },
 // Repeat similar objects for other medicines
];

function MedicineGrid() {
 return (
  <div className="medicine-grid">
   {" "}
   {medicines.map((medicine) => (
    <MedicineCard key={medicine.id} medicine={medicine} />
   ))}{" "}
  </div>
 );
}

export default MedicineGrid;
