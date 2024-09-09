/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constant";

export default function MedicineDisplay() {
 const [medicines, setMedicines] = useState([]);

 useEffect(() => {
  const fetchMedicines = async () => {
   try {
    const response = await axios.get(`${baseUrl}/medicines`);
    setMedicines(response.data);
   } catch (error) {
    console.error("Failed to fetch medicines", error);
   }
  };

  fetchMedicines();
 }, []);

 return (
  <div>
   <h1> Medicines </h1>{" "}
   <ul>
    {" "}
    {medicines.map((medicine) => (
     <li key={medicine.id}> {medicine.name} </li>
    ))}{" "}
   </ul>{" "}
  </div>
 );
}
