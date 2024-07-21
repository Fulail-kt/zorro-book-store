'use client'
import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Pagination, 
  CircularProgress, 
  Container, 
  Grid, 
  TextField,
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { getAllBooks } from '@/service/axios/end-points';
import BookCard from '@/components/global/book-card';
import Header from '@/components/global/header';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(['Fiction', 'Non-Fiction', 'Science Fiction', 'Biography', 'Mystery', 'Fantasy', 'Romance']);

  useEffect(() => {
    fetchBooks(page, search, category);
  }, [page, search, category]);

  const fetchBooks = async (pageNumber, searchQuery,categoryFilter) => {
    setLoading(true);
    try {
      const response = await getAllBooks(pageNumber, 4, searchQuery=categoryFilter);
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
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  return (
    <>
      <Header/>
      <div className='w-full h-16'></div>
     
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
            className="w-64 custom-textfield mr-4"
          />
          <FormControl variant="outlined" className="w-64 custom-textfield">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              className=''
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
    </>
  );
};

export default BooksPage;