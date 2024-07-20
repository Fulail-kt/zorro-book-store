import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const handleQuantityChange = (action) => {
    updateQuantity(item._id,item?.productId?._id, action);
  };

  return (
    <Box className="flex items-center justify-between py-4 border-b">
      <Box className="flex items-center">
        <img src={item.productId.Image} alt={item.productId.title} className="w-20 h-20 object-cover mr-4" />
        <Box>
          <Typography variant="subtitle1">{item.productId.title}</Typography>
          <Typography variant="body2" color="textSecondary">{item.productId.author}</Typography>
          <Typography variant="body2">${item.price.toFixed(2)}</Typography>
        </Box>
      </Box>
      <Box className="flex items-center">
        <IconButton 
          onClick={() => handleQuantityChange('decrease')}
          disabled={item.quantity <= 1}
        >
          <RemoveIcon />
        </IconButton>
        <Typography className="mx-2">{item.quantity}</Typography>
        <IconButton 
          onClick={() => handleQuantityChange('increase')}
          disabled={item.quantity >= item.productId.stockQuantity}
        >
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => removeFromCart(item._id)} className="ml-2">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;