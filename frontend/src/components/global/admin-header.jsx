'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { Book, FilePresent, Logout, Person3, VerifiedUser } from '@mui/icons-material';

const AdminHeader = () => {
  const [userId, setUserId] = useState(null);
//   const [user,setUser]=useState(false)
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
    setUserId('')
  };

  return (
    <div className='w-full z-20 fixed'>
      <AppBar position="static" style={{ background: '#ef9918' }} className="bg-orange-400">
        <Toolbar className="justify-between">
          <Typography variant="h6" className="font-bold">
            Admin Dashboard
          </Typography>
          <div className="hidden md:flex space-x-4">
            <Link href='/books'>  <Button className='hidden md:block' color="inherit">  Books</Button></Link>
            <Link href='/users'><Button color="inherit">Users</Button></Link>
            <Link href='/orders'><Button color="inherit">Orders</Button></Link>
          </div>
          <div className="flex md:hidden space-x-4">
            <Link href='/books'><span ><Book/></span>  </Link>
            <Link href='/users'><Person3/></Link>
            <Link href='/orders'><FilePresent/></Link>
          </div>
          <div className="flex space-x-2">
            {userId && (
              <Button color="inherit" className='flex items-center gap-2' onClick={handleLogout} >
                <span className='hidden md:flex'>Logout</span> <span className=''><Logout/></span>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminHeader;
