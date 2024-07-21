'use client'
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, TablePagination, Select, MenuItem
} from '@mui/material';
import { getAllOrders, updateOrderStatus } from '@/service/axios/end-points'; 

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, search]);

  const fetchOrders = async () => {
    const response = await getAllOrders();
    if (response?.success) {
      setOrders(response?.orders)
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

  const handleStatusChange = async (orderId, newStatus) => {
    const response = await updateOrderStatus(orderId, newStatus);
    if (response?.success) {
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    }
  };

  const filteredOrders = orders.filter(order => 
    order.user.name.toLowerCase().includes(search.toLowerCase()) ||
    order._id.includes(search)
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <TextField
          label="Search by Name or Order ID"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-64 custom-textfield"
        />
      </div>
      <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className='bg-gray-800 text-white'
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default OrdersTable;