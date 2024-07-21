import express from 'express';
import { createOrder, getAllOrders, getOrderById, getOrderByUserId, updateOrderStatus } from '../controllers/order.controller.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/:id', auth, createOrder);

router.put('/:id', auth, updateOrderStatus);

// @route   GET api/orders
// @desc    Get all orders for a user
// @access  Private
router.get('/', auth, getAllOrders);

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, getOrderById);
router.get('/user/:userId', auth, getOrderByUserId);

export default router;