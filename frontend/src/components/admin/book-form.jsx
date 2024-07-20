import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';

const BookForm = ({ initialBook, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
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
    <Box className="max-w-md mx-6 rounded-xl  text-white p-2">
      <Typography variant="h4" className="mb-4 flex justify-center font-semibold mt-4">
        {isUpdating ? 'Update Book' : 'Add Book'}
      </Typography>
      <form  onSubmit={handleSubmit(submitHandler)}>
        <div className='h-80 py-2 overflow-scroll'>
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
            <TextField
              {...register('category')}
              label="Category"
              fullWidth
              className="mb-4 custom-textfield"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
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
              {...register('image')}
              label="Image URL"
              fullWidth
              className="mb-4 custom-textfield"
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
