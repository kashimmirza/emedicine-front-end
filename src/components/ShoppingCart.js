/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
 Badge,
 IconButton,
 Drawer,
 List,
 ListItem,
 ListItemText,
 ListItemSecondaryAction,
 Divider,
 Typography,
 Button,
 Box,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ userId }) => {
 const [cartItems, setCartItems] = useState([]);
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  fetchCartItems();
 }, []);

 const fetchCartItems = async () => {
  try {
   const response = await axios.get(`/api/cart/${userId}`);
   setCartItems(response.data);
  } catch (error) {
   console.error("Error fetching cart items:", error);
  }
 };

 const removeItem = async (id) => {
  try {
   await axios.delete(`/api/cart/${id}`);
   setCartItems(cartItems.filter((item) => item.id !== id));
  } catch (error) {
   console.error("Error removing item:", error);
  }
 };

 const calculateTotal = () => {
  return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
 };

 const toggleDrawer = (open) => () => {
  setIsDrawerOpen(open);
 };

 return (
  <div>
   {/* Cart Icon in Top Panel */}
   <IconButton color="inherit" onClick={toggleDrawer(true)}>
    <Badge badgeContent={cartItems.length} color="secondary">
     <FaShoppingCart size={30} />
    </Badge>
   </IconButton>

   {/* Shopping Cart Drawer */}
   <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
    <Box sx={{ width: 300, padding: 2 }}>
     <Typography variant="h6" gutterBottom>
      Your Shopping Cart
     </Typography>
     <Divider />
     <List>
      {cartItems.length === 0 ? (
       <Typography variant="body1" sx={{ padding: 2 }}>
        Your cart is empty.
       </Typography>
      ) : (
       cartItems.map((item) => (
        <ListItem key={item.id}>
         <ListItemText
          primary={`Medicine ID: ${item.medicineID}`}
          secondary={`Price: $${item.unitPrice} x ${item.quantity} = $${item.totalPrice}`}
         />
         <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => removeItem(item.id)}>
           <DeleteIcon color="error" />
          </IconButton>
         </ListItemSecondaryAction>
        </ListItem>
       ))
      )}
     </List>
     <Divider />
     {cartItems.length > 0 && (
      <>
       <Typography variant="h6" sx={{ padding: "10px 0" }}>
        Total: ${calculateTotal().toFixed(2)}
       </Typography>
       <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate("/checkout")}
       >
        Proceed to Checkout
       </Button>
      </>
     )}
    </Box>
   </Drawer>
  </div>
 );
};

export default ShoppingCart;
