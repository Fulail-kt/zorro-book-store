'use client'
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, Dialog, TablePagination, Menu, MenuItem, IconButton, DialogContent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookForm from '@/components/admin/book-form';
import { addBook, deleteBook, getAllBooksForAdmin, updateBook } from '@/service/axios/end-points';

import { storage } from "../../service/firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [page, rowsPerPage, search]);

  const fetchBooks = async () => {
    const response = await getAllBooksForAdmin();
    if (response?.success) {
      setBooks(response?.books)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleOpenModal = (book = null) => {
    setCurrentBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentBook(null);
  };

  const handleSubmit = async (data) => {
    let imageUrl = '';
    if (data.image && data.image[0]) {
      const file = data.image[0];
      const fileRef = ref(storage, `files/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    if (currentBook) {
      // Update existing book
      const response = await updateBook(currentBook._id, { ...data, image: imageUrl || currentBook.image });
      if (response.success) {
        alert(response.message);
        setBooks((prev) => prev.map((book) =>
          book._id === currentBook._id ? response.book : book
        ));
      }
    } else {
      // Add new book
      const response = await addBook({ ...data, image: imageUrl });
      if (response.success) {
        alert(response.message);
        setBooks((prev) => [...prev, response.book]);
      }
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    const response = await deleteBook(id);
    if (response?.success) {
      alert(response?.message);
      setBooks(books.filter(book => book._id !== id));
    }
  };

  const handleMenuOpen = (event, bookId) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookId(bookId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBookId(null);
  };

  return (
    <div className="p-4 px-8">
      <div className="flex justify-between mb-4">
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-64 custom-textfield"
        />
        <Button variant="contained" onClick={() => handleOpenModal()} color="primary">
          Add New Book
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.stockQuantity}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, book._id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className='bg-gray-800 text-white'
        component="div"
        count={books?.length}
        variant='outline'
        shape='rounded'
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openModal} onClose={handleCloseModal}>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          X
        </IconButton>
        <DialogContent className='bg-gray-800 text-white'>
          <BookForm initialBook={currentBook} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleOpenModal(books.find(book => book._id === selectedBookId));
          handleMenuClose();
        }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          handleDelete(selectedBookId);
          handleMenuClose();
        }}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BooksTable;
