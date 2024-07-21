'use client'
import React, { useEffect, useId, useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Box,
  IconButton,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToCart, getBookById } from '@/service/axios/end-points';
import { jwtDecode } from 'jwt-decode';
import Header from '@/components/global/header';

const BookDetails = ({ params }) => {
    const id=params.id

    const [isFavorite, setIsFavorite] = useState(false);
    const [book, setBook] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(()=>{
        
        (async () => {
            const response = await getBookById(id)
            if(response?.success){
                setBook(response?.book)
            }
        })();
        
        const token=localStorage.getItem('zr_token')   
          if(token){
            const decode=jwtDecode(token)
            setUserId(decode?.id)
          }
    },[])

  const handleAddToCart = () => {

    if(userId){
        const response = addToCart(userId,id);
        console.log('Added to cart:', book.title);

    }else{
        alert('Please login to add to cart')
    }
  };

  const handleToggleFavorite = () => {

    setIsFavorite(!isFavorite);
    console.log(isFavorite ? 'Removed from favorites:' : 'Added to favorites:', book.title);
  };

  return (
    <>
    <Header/>
    <div className='h-16 w-full'></div>
  
    <Container className="py-8">
      <Paper elevation={3} className="p-6 bg-gray-300">
        <Grid container spacing={4}>
          <Grid item xs={12} className='flex  justify-center' md={4}>
            <div className='w-full  flex justify-center items-center'>
                <img
                height={10}
                  src={book?.image}
                  alt={book?.title}
                  className="w-44  rounded-lg shadow-lg"
                />
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" className="mb-4">
              {book?.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" className="mb-2">
              by {book?.author}
            </Typography>
            <Typography variant="body1" className="mb-4">
              {book?.description}
            </Typography>
            <Typography variant="h5" color="primary" className="mb-4">
              ₹ {book?.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Category: {book?.category}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              In Stock: {book?.stockQuantity}
            </Typography>
            <Box className="flex items-center space-x-4">
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#4CAF50' }}
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                className="flex-grow"
              >
                Add to Cart
              </Button>
              <IconButton
                color={isFavorite ? 'secondary' : 'default'}
                onClick={handleToggleFavorite}
                aria-label="add to favorites"
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
};

export default BookDetails;