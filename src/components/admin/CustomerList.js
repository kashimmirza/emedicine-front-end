/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomerList() {
 const [customers, setCustomers] = useState([]);

 useEffect(() => {
  // Fetch customer data from the backend
  axios
   .get("https://localhost:7266/api/Customers")
   .then((response) => {
    setCustomers(response.data);
   })
   .catch((error) => {
    console.error("There was an error fetching the customer data!", error);
   });
 }, []);

 // Handle delete
 const handleDelete = (id) => {
  axios
   .delete(`https://localhost:7266/api/Customers/${id}`)
   .then((response) => {
    // Remove deleted customer from state
    setCustomers(customers.filter((customer) => customer.id !== id));
   })
   .catch((error) => {
    console.error("There was an error deleting the customer!", error);
   });
 };

 // Handle update (dummy implementation)
 const handleUpdate = (id) => {
  // Navigate to update page or show update form
  console.log(`Update customer with ID: ${id}`);
 };

 return (
  <div className="container mt-5">
   <h1 className="text-center mb-4"> Customer List </h1>{" "}
   <table className="table table-striped">
    <thead>
     <tr>
      <th> ID </th> <th> First Name </th> <th> Last Name </th> <th> Email </th>{" "}
      <th> Phone Number </th> <th> Fund </th> <th> Type </th> <th> Status </th>{" "}
      <th> Created On </th> <th> Actions </th>{" "}
     </tr>{" "}
    </thead>{" "}
    <tbody>
     {" "}
     {customers.map((customer) => (
      <tr key={customer.id}>
       <td> {customer.id} </td> <td> {customer.firstName} </td>{" "}
       <td> {customer.lastName} </td> <td> {customer.email} </td>{" "}
       <td> {customer.phoneNumber} </td> <td> {customer.fund} </td>{" "}
       <td> {customer.type} </td> <td> {customer.status} </td>{" "}
       <td> {new Date(customer.createdOn).toLocaleDateString()} </td>{" "}
       <td>
        <button
         className="btn btn-warning btn-sm me-2"
         onClick={() => handleUpdate(customer.id)}
        >
         Update{" "}
        </button>{" "}
        <button
         className="btn btn-danger btn-sm"
         onClick={() => handleDelete(customer.id)}
        >
         Delete{" "}
        </button>{" "}
       </td>{" "}
      </tr>
     ))}{" "}
    </tbody>{" "}
   </table>{" "}
  </div>
 );
}
