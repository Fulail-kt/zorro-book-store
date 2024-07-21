import express from 'express';
import { body, param } from 'express-validator';
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getAllBooksForAdmin,
  getBookById
} from '../controllers/book.controller.js';

const router = express.Router();

// Validation rules
const bookValidationRules = [
  body('title').isString().withMessage('Title is required'),
  body('author').isString().withMessage('Author is required'),
  body('description').isString().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isString().withMessage('Category is required'),
  body('stockQuantity').isNumeric().withMessage('Stock Quantity must be a number'),
  body('image').optional().isString().withMessage('Image must be a string'),
];

const bookIdValidationRules = [
  param('id').isMongoId().withMessage('Invalid book ID'),
];

// Create a new book
router.post('/', bookValidationRules, createBook);

// Get all books for admin
router.get('/admin', getAllBooksForAdmin);
// router.get('/search', getAllBooks);
// Get all books with pagination and search
router.get('/', getAllBooks);
// Get book by Id
router.get('/:id',bookIdValidationRules, getBookById);

// Update a book
router.put('/:id', bookIdValidationRules, bookValidationRules, updateBook);

// Delete a book
router.delete('/:id', bookIdValidationRules, deleteBook);

export default router;
