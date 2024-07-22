import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { userModel } from '../models/userModel.js';
import { bookModel } from '../models/bookModel.js';


// @desc    Register user
// @access  Public
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

  res.status(200).json({ message: 'registration successful', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Registration failed', success: false });
  }
};


// @desc    Authenticate user & get token
// @access  Public
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials', success: false });
    }

    console.log(user,"user who log")

    if(user.isDeleted){
      return res.status(400).json({ message: 'This account blocked by admin please contact admin', success: false });
    }

    const payload = { id: user._id ,role:user.role };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'SECRET-ZORRO',
      { expiresIn: '8h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token,role:user.role, success: true, message: 'login success' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'login failed', success: false });
  }
};

export const deleteToggle=async (req,res)=>{
  try { 
    const user=await userModel.findById(req.params.id);
    user.isDeleted=!user.isDeleted;
    user.save()
    res.json({ user, success:true,message: user.isDeleted?'user account soft deleted':'restored user account'})
  } catch (error) {
    
  }
}

// @desc    Get user by token
// @access  Private
export const getUserByToken = async (req, res) => {
  try {

    const user = await userModel.findById(req.id).select('-password').populate({path:'cart.productId',model:'Book'});
    res.json({ user, message: 'successfully retrieved', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'retrieve user failed', success: false });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({role:'customer'}).select('-password')
    res.json({ users, message: 'successfully retrieved', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'retrieve user failed', success: false });
  }
};



export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password').populate({path:'cart.productId',model:'Book'});
    res.json({ user, message: 'successfully retrieved', success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'retrieve user failed', success: false });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const book = await bookModel.findById(productId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (cartItemIndex !== -1) {
      user.cart[cartItemIndex].quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1, price: book.price });
    }

    await user.save();

    res.status(200).json({ success: true, message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'An error occurred while adding to cart' });
  }
};



export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, action } = req.body;

    console.log(req.body,"-e-e")

    let user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const dgh = user.cart.findIndex(item => console.log(item.productId.toString()));
    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() == productId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    const book = await bookModel.findById(productId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    let newQuantity;
    if (action === 'increase') {
      newQuantity = Math.min(user.cart[cartItemIndex].quantity + 1, book.stockQuantity);
    } else if (action === 'decrease') {
      newQuantity = Math.max(user.cart[cartItemIndex].quantity - 1, 0);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }

      user.cart[cartItemIndex].quantity = newQuantity;

    await user.save();

    user = await userModel.findById(id).populate({
      path: 'cart.productId',
      model: 'Book',
    });

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the cart' });
  }
};


export const deleteFromCart = async (req, res) => {
  try {
    const { id, cartId } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const cartItemIndex = user.cart.findIndex(item => item._id.toString() === cartId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'An error occurred while removing the item from cart' });
  }
};