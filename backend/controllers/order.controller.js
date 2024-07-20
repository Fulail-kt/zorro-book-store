import { bookModel } from '../models/bookModel.js';
import { orderModel } from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const { books, shippingAddress } = req.body;

    let totalAmount = 0;
    for (let item of books) {
      const book = await bookModel.findById(item.book);
      if (!book) {
        return res.status(404).json({ message: 'Book not found', success: false });
      }
      if (book.stockQuantity < item.quantity) {
        return res.status(400).json({ message: 'Insufficient stock', success: false });
      }
      totalAmount += book.price * item.quantity;
      book.stockQuantity -= item.quantity;
      await book.save();
    }

    const newOrder = new orderModel({
      user: req.user.id,
      books,
      totalAmount,
      shippingAddress
    });

    const order = await newOrder.save();

    res.json({ order, message: 'order created successfully', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "an error occurred" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders, message: 'success', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'server error' || err.message, success: false });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authorized' });
    }

    res.json({ order, message: 'success', success: true });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
};