/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPopover = ({ handleProceedToCheckout }) => {
 const [cartDetails, setCartDetails] = useState({
  totalProducts: 0,
  totalPrice: 0,
 });
 const [showPopover, setShowPopover] = useState(false);

 const fetchCartDetails = async () => {
  try {
   const userId = 1;
   const response = await axios.get(`/api/medicine/getCartDetails/${userId}`);
   setCartDetails(response.data);
  } catch (error) {
   console.error("Error fetching cart details:", error);
  }
 };

 const togglePopover = () => {
  setShowPopover(!showPopover);
  fetchCartDetails();
 };

 return (
  <div>
   <button onClick={togglePopover}>Cart</button>
   {showPopover && (
    <div className="popover">
     <div className="popover-header">
      <img src="/cart.png" alt="Cart" />
      <span>{cartDetails.totalProducts === 0 ? "Empty" : "Cart"}</span>
     </div>
     <div className="popover-body">
      {cartDetails.totalProducts === 0 ? (
       <p>Your cart is empty.</p>
      ) : (
       <div>
        <p>Total Products: {cartDetails.totalProducts}</p>
        <p>Total Price: ${cartDetails.totalPrice}</p>
        <button onClick={handleProceedToCheckout} className="checkout-button">
         Proceed to Checkout
        </button>
       </div>
      )}
     </div>
    </div>
   )}
  </div>
 );
};

export default CartPopover;
