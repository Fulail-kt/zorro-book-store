'use client';
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, TablePagination, Menu, MenuItem, IconButton, DialogContent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsers, blockUser, toggleUser } from '@/service/axios/end-points';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, search]);

  const fetchUsers = async () => {
    const response = await getAllUsers();
    if (response?.success) {
      setUsers(response?.users);
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

  const handleBlockUser = async (id) => {
    const response = await toggleUser(id);
    if (response?.success) {
      alert(response?.message);
      setUsers(users?.map(user => user._id === id ? response.user : user));
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
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
      </div>
      <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user?._id}>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.isDeleted ? "InActive" : 'Active'}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, user?._id)}>
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
        count={users?.length}
        variant='outline'
        shape='rounded'
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleBlockUser(selectedUserId);
          handleMenuClose();
        }}>
          {users.find(user => user._id === selectedUserId)?.isDeleted ? "Unblock" : "Block"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UsersTable;
