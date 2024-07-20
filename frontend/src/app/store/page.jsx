'use client'
import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardMedia, Typography, Button, 
  Pagination, CircularProgress, Container, Grid, TextField 
} from '@mui/material';
import { getAllBooks } from '@/service/axios/end-points';
import BookCard from '@/components/global/book-card';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks(page, search);
  }, [page, search]);

  const fetchBooks = async (pageNumber, searchQuery) => {
    setLoading(true);
    try {
      const response = await getAllBooks(pageNumber, 4, searchQuery);
      if(response?.success){
        setBooks(response?.books);
        setTotalPages(response?.totalPages);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page whenever search changes
  };

  return (
    <Container className="py-8">
      <Typography variant="h4" component="h1" className="mb-6 text-center font-bold">
        Book Store
      </Typography>

      <div className="mb-4 flex justify-center">
        <TextField 
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-64 custom-textfield"

        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container spacing={4}>
            {books.map((book) => (
              <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
               <BookCard book={book} />
              </Grid>
            ))}
          </Grid>

          <div className="mt-8 bg-white bg-opacity-30 rounded-lg text-white flex justify-center">
            <Pagination 
              count={totalPages} 
              page={page} 
              variant='outline'
              shape='rounded'
              onChange={handlePageChange}
              color=""
              size="large"
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default BooksPage;
