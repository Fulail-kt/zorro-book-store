import axiosInstance from "./axios-instance";
import { toast } from 'sonner'

export const login = async (user) => {
  try {
    const response = await axiosInstance.post("/user/login", user);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const create = async (user) => {
  try {
    const response = await axiosInstance.post("/user/register", user);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

// books crud

export const getAllBooksForAdmin = async () => {
  try {
    console.log("first")
    const response = await axiosInstance.get(`/book/admin`);
    console.log("seco",response)
    if (response?.data?.success) {
   
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const getAllBooks = async (page,limit,search) => {
  try {
    const response = await axiosInstance.get(`/book?page=${page}&limit=${limit}&search=${search}`);
    if (response?.data?.success) {
    
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const addBook = async (book) => {
  console.log(book,"add")
  try {
    const response = await axiosInstance.post("/book", book);
    console.log(response,"de")
    if (response?.status === 201) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const getBookById = async (id) => {
  console.log(id)
  try {
    const response = await axiosInstance.get(`/book/${id}`);
    if (response?.data?.success) {
   
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const updateBook = async (id,book) => {
  console.log(id,book,"he")
  try {
    const response = await axiosInstance.put(`/book/${id}`, book);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};
 
export const deleteBook = async (id) => {
  console.log(id,"del")
  try {
    const response = await axiosInstance.delete(`/book/${id}`);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

// user crud 

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, user);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const toggleUser = async (id) => {
  try {
    const response = await axiosInstance.put(`/user/block/${id}`);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    console.log(response?.data?.user,"ehoe")
    if (response?.data?.success) {

      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    console.log(response,"suers")
    if (response?.data?.success) {
 
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

// cart 

export const addToCart = async (id,productId) => {
  try {
    const response = await axiosInstance.post(`/user/add-to-cart/${id}`,{productId});
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const updateQuantity = async (userId,productId,action) => {
  try {
    const response = await axiosInstance.put(`/user/update-cart/${userId}`,{action,productId});
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const deleteFromCart = async (id,cartId) => {
  try {
    const response = await axiosInstance.delete(`user/delete/${id}/${cartId}`);
    console.log(response, "de")
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const createOrder = async (id, order) => {
  try {
    const response = await axiosInstance.post(`/order/${id}`, order);
    console.log(response, "de--")
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const getOrderByUserId = async (id) => {
  try {
    const response = await axiosInstance.get(`/order/user/${id}`);
    if (response?.data?.success) {
   
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get(`/order`);
    if (response?.data?.success) {
   
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`/order/${id}`, {status});
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response?.data;
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error?.message || "An error occurred");
  }
};