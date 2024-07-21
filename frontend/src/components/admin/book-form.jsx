import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const bookCategories = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Biography', 'Mystery', 'Fantasy', 'Romance'];

const BookForm = ({ initialBook, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: initialBook || {
      title: '',
      author: '',
      description: '',
      price: '',
      category: '',
      stockQuantity: '',
      image: ''
    }
  });

  const isUpdating = !!initialBook;

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <Box className="max-w-md mx-6 rounded-xl text-white p-2">
      <Typography variant="h4" className="mb-4 flex justify-center font-semibold mt-4">
        {isUpdating ? 'Update Book' : 'Add Book'}
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='h-80 py-2 space-y-4 overflow-scroll'>
          <TextField
            {...register('title', { required: 'Title is required' })}
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
            className="mb-4 custom-textfield"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            {...register('author', { required: 'Author is required' })}
            label="Author"
            error={!!errors.author}
            helperText={errors.author?.message}
            fullWidth
            className="mb-4 custom-textfield"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            {...register('description')}
            label="Description"
            multiline
            rows={4}
            fullWidth
            className="mb-4 custom-textfield"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            {...register('price', {
              required: 'Price is required',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Enter a valid price'
              }
            })}
            label="Price"
            error={!!errors.price}
            helperText={errors.price?.message}
            fullWidth
            className="mb-4 custom-textfield"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <FormControl fullWidth className="mb-4 custom-textfield">
            <InputLabel style={{ color: 'white' }}>Category</InputLabel>
            <Select
              {...register('category')}
              defaultValue=""
              onChange={(e) => setValue('category', e.target.value)}
              inputProps={{ style: { color: 'white' } }}
              label="Category"
              className="custom-textfield"
            >
              {bookCategories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            {...register('stockQuantity', {
              required: 'Stock quantity is required',
              pattern: {
                value: /^\d+$/,
                message: 'Enter a valid number'
              }
            })}
            label="Stock Quantity"
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity?.message}
            fullWidth
            className="mb-4 custom-textfield"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            type="file"
            error={!!errors.image}
            helperText={errors.image?.message}
            accept="image/*"
            {...register('image',{required:'image is required'})}
            className="mb-4 w-full custom-textfield"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </div>
        <div className='w-full flex justify-center'>
          <Button type="submit" variant="contained" color="primary">
            {isUpdating ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default BookForm;
