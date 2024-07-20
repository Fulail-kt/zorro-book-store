// pages/checkout.js
'use client'
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const Checkout = () => {
   const cartItems=[{ id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "/placeholder/200/300" },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: "/placeholder/200/300" },]
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-6">Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <Box className="mb-6">
          <Typography variant="h6" className="mb-4">Shipping Information</Typography>
          <TextField label="Full Name" fullWidth className="mb-4" required />
          <TextField label="Address" fullWidth className="mb-4" required />
          <TextField label="City" fullWidth className="mb-4" required />
          <TextField label="Postal Code" fullWidth className="mb-4" required />
          <TextField label="Phone Number" fullWidth className="mb-4" required />
        </Box>

        <Box className="mb-6">
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="cashOnDelivery" control={<Radio />} label="Cash on Delivery" />
              {/* Add more payment options here if needed */}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" className="mb-4">Order Summary</Typography>
          {cartItems.map((item) => (
            <Box key={item._id} className="flex justify-between mb-2">
              <Typography>{item.title} x {item.quantity}</Typography>
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Box className="flex justify-between mt-4">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;