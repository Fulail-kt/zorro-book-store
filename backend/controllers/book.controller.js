import { bookModel } from "../models/bookModel.js";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const book = new bookModel(req.body);
    await book.save();
    res.status(201).json({book,message:'create successfully' ,success:true});
  } catch (error) {
    res.status(400).json({ message: error.message,success:false });
  }
};

// Get all books with pagination and search
export const getAllBooks = async (req, res) => {
  // console.log(req,"req")
  try {
    const { page = 1, limit = 4, search = '' } = req.query;

    const skip = (page - 1) * limit;

    const searchRegex = new RegExp(search, 'i');
    const query = {
      $or: [
        { title: searchRegex },
        { author: searchRegex },
        { category: searchRegex }
      ]
    };

    const books = await bookModel.find(query)
      .limit(Number(limit))
      .skip(skip)
      .exec();

    const count = await bookModel.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const getAllBooksForAdmin = async (req, res) => {
  try {
    const books = await bookModel.find()
    res.json({
      books,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// get by Id
export const getBookById= async (req, res) => {
  try {
    const book = await bookModel.findById(req?.params?.id)
    res.json({
      book,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


// Update a book
export const updateBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' ,success:false});
    res.json({book,message:'updated',success:true});
  } catch (error) {
    res.status(400).json({ message: error.message,success:false });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' , success:false });
    res.json({ success:true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message,success:false });
  }
};
