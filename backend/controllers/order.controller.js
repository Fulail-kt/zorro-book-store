import { bookModel } from '../models/bookModel.js';
import { orderModel } from '../models/orderModel.js';
import { userModel } from '../models/userModel.js';

export const createOrder = async (req, res) => {
  try {
    const { books, shippingAddress } = req.body;
    const userId = req.params.id;

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
      user: userId,
      books,
      totalAmount,
      shippingAddress
    });

    const order = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { $set: { cart: [] } });

    res.json({ order, message: 'Order placed successfully', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "An error occurred" ,success:false});
  }
};

// get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 }).populate([{model:"User",path:'user'},{model:"Book",path:'books.book'}])
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
export const getOrderByUserId = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);

    const order= await orderModel.find({user:user}).populate([{model:"User",path:'user'},{model:"Book",path:'books.book'}])

    if (!order || !user)  {
      return res.status(404).json({ success: false, message: 'not found' });
    }


    res.json({ order,user, message: 'success', success: true });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ order, message: 'Order status updated', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
