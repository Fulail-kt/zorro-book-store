'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { Logout } from '@mui/icons-material';

const AdminHeader = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('zr_token');
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('zr_token');
    navigate.replace('/');
  };

  return (
    <div className='w-full z-20 fixed'>
      <AppBar position="static" style={{ background: '#ef9918' }} className="bg-orange-400">
        <Toolbar className="justify-between">
          <Typography variant="h6" className="font-bold">
            Admin Dashboard
          </Typography>
          <div className="hidden sm:flex space-x-4">
            <Link href='/admin/dashboard'><Button color="inherit">Dashboard</Button></Link>
            <Link href='/admin/books'><Button color="inherit">Books</Button></Link>
            <Link href='/admin/users'><Button color="inherit">Users</Button></Link>
          </div>
          <div className="flex space-x-2">
            {userId && (
              <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminHeader;
