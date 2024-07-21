'use client'
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Card, 
  CardContent, 
  Grid, 
  Tabs, 
  Tab, 
  LinearProgress,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const OrderCard = ({ order }) => {
  const getStatusPercentage = (status) => {
    switch (status) {
      case 'pending': return 25;
      case 'processing': return 50;
      case 'shipped': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'secondary';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card className="mb-4 shadow-md bg-blue-200">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Order ID: {order?._id}</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(order?.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="text-right">
            <Typography variant="h6">₹{order?.totalAmount.toFixed(2)}</Typography>
          </Grid>


          <Grid item xs={12} sm={6}>
             {order?.books.map((book)=>(
                <Typography key={book?._id} variant="subtitle1">Books: {book?.book?.title}  x {book?.quantity}</Typography>
            ))}
          </Grid>
          
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={getStatusPercentage(order?.status)} 
                  color={getStatusColor(order?.status)}
                />
              </Box>
              <Box minWidth={60}>
                <Chip 
                  label={order?.status} 
                  color={getStatusColor(order?.status)} 
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default OrderCard;