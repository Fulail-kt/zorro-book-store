"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { createOrder, getUserById } from "@/service/axios/end-points";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [userId, setUserId] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigate=useRouter()
  useEffect(() => {
    
    const token = localStorage.getItem("zr_token");
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode?.id);
      fetchUser(decode?.id);
    }
  }, []);

  const fetchUser = async (id) => {
    const response = await getUserById(id);
    if (response?.success) {
      setCartItems(response?.user?.cart);
    }

    if(response?.user?.cart?.length===0){
      navigate.replace('/')
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const onSubmit = async (data) => {
    try {
      const orderData = {
        books: cartItems.map(item => ({
          book: item.productId._id,
          quantity: item.quantity
        })),
        shippingAddress: `${data.address}, ${data.city}, ${data.postalCode}`
      };

      const response = await createOrder(userId,orderData)

      if (response.success) {
        navigate.replace('/profile')
      }
    } catch (error) {
      console.error('Error placing order:', error);
     
    }
  };



  return (
    <Box className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-6">
        Checkout
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper className="p-4 mb-6 bg-black">
              <Typography variant="h6" className="mb-4 text-white">
                Shipping Information
              </Typography>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    className="mb-4 custom-textfield"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    className="mb-4 custom-textfield"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    className="mb-4 custom-textfield"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{ required: "Postal code is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    fullWidth
                    className="mb-4 custom-textfield"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    className="mb-4 custom-textfield"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <h1 className="text-2xl font-semibold text-center py-4">
              Order Summary
            </h1>

            <Paper className="p-4 mb-6">
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="cashOnDelivery"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-4">
                Order Summary
              </Typography>
              {cartItems.map((item) => (
                <Box key={item?._id} className="flex justify-between mb-2">
                  <Typography>
                    {item?.productId.title} x {item?.quantity}
                  </Typography>
                  <Typography>
                    ₹ {(item?.productId?.price * item?.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Box className="flex justify-between mt-4">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹ {total?.toFixed(2)}</Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
     
    </Box>
  );
};

export default Checkout;