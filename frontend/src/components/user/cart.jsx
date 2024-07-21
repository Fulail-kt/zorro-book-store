'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import CartItem from './cart-item';
import { deleteFromCart, getUserById, updateQuantity } from '@/service/axios/end-points';
import { jwtDecode } from 'jwt-decode';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchUser = async (id) => {
    const response = await getUserById(id);
    console.log(response, "response");
    if (response?.success) {
      setCartItems(response?.user?.cart);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('zr_token');
    if (token) {
      const decode = jwtDecode(token);
      console.log(decode, "k");
      fetchUser(decode?.id);
      setUserId(decode?.id);
    }
  }, []);

  const updateCart = async (cartId,productId, action) => {
    const response = await updateQuantity(userId, productId, action);
    if (response?.success) {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item?._id === cartId 
            ? { ...item, quantity: response?.cart.find(cartItem => cartItem?._id === cartId).quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = async (id) => {
    const response = await deleteFromCart(userId,id);
    if (response.success) {
      console.log(response, "response");
      setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-6">Your Cart</Typography>
        <Grid container spacing={4}>
      {cartItems.length === 0 ? (
        <Typography className='text-center w-full'>Your cart is empty.</Typography>
      ) : ( <Grid item xs={12} md={8}>
            <Paper className="p-4">
              {cartItems?.map((item) => (
                <CartItem 
                  key={item?._id} 
                  item={item} 
                  updateQuantity={updateCart}
                  removeFromCart={removeFromCart}
                />
              ))}
            </Paper>
          </Grid>)}
          <Grid className='' item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-4">Order Summary</Typography>
              <Typography className="mb-2">Total: ₹ {total?.toFixed(2)}</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                href="/checkout"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
   
    </Box>
  );
};

export default Cart;