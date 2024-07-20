'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React, { useEffect } from 'react'
import { ShoppingCart as CartIcon, Person, Lock, Power, Logout, Login } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

  const [userId,setUserId]=useState(null);
  const navigate=useRouter()
  useEffect(()=>{
    const token=localStorage.getItem('zr_token')
    if(token){
      const decode=jwtDecode(token)
      setUserId(decode.id)
    }
    
  },[])

  const handleLogout=()=>{
    localStorage.removeItem('zr_token')
    navigate.replace('/')
  }
    
  return (
    <div className='w-full z-20 fixed'>
        <AppBar position="static" style={{background:'#ef9918'}} className="bg-orange-400">
        <Toolbar className="justify-between">
          <Typography variant="h6" className="font-bold">
            BookHaven
          </Typography>
          <div className="hidden sm:flex space-x-4">
            <Link href='/'><Button color="inherit">Home</Button></Link>
            <Link href='/store'><Button color="inherit">Store</Button></Link>
            <Button color="inherit">Contact</Button>
          </div>
          <div className="flex space-x-2">
            { !userId ? (<Link href='/sign-in'>
                <Button color="inherit" startIcon={<Login />}>
                  sign in
                </Button>
            </Link>) :
            (
                <Button color="inherit" onClick={handleLogout} startIcon={<Logout/>}>
                  sign out
                </Button>
          )}
            <Link href='/cart'>
                <Button color="inherit" startIcon={<CartIcon />}>
                  Cart
                </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default Header