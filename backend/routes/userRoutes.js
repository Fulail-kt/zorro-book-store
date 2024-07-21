import express from 'express';
import { register, login, getUserByToken, addToCart, getUserById, updateCartQuantity, deleteFromCart, deleteToggle, getAllUsers } from '../controllers/user.controller.js';
import { check, param } from 'express-validator';
import {auth} from '../middleware/auth.js';

const router = express.Router();

const bookIdValidationRules = [
  param('id').isMongoId().withMessage('Invalid book ID'),
];

// @route   POST /users/register

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register);

// @route   POST /users/login

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], login);

// @route   GET /users
// @desc    Get user by token
router.get('/', auth, getAllUsers);
router.put('/block/:id', auth, deleteToggle);
router.get('/:id',bookIdValidationRules,auth, getUserById);

router.put('/update-cart/:id',updateCartQuantity );


router.post('/add-to-cart/:id',addToCart);
router.delete('/delete/:id/:cartId',deleteFromCart);

export default router;