'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React, { useEffect } from 'react'
import { ShoppingCart as CartIcon, Person, Lock, Power, Logout, Login, Home, Store } from '@mui/icons-material';
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
    setUserId('')

  }
    
  return (
    <div className='w-full z-20 fixed'>
        <AppBar position="static" style={{background:'#ef9918'}} className="bg-orange-400">
        <Toolbar className="justify-between">
          <Typography variant="h6" className="font-bold">
            BookHaven
          </Typography>
          <div className="space-x-4">
            <Link href='/'><Button color="inherit">
              <span className='hidden md:flex'>Home</span> <span className='md:hidden'><Home /></span>
              </Button></Link>
            <Link href='/store'><Button color="inherit">
              <span className='hidden md:flex'>Store</span> <span className='md:hidden'><Store /></span>
              </Button></Link>
           { userId && <Link href="/profile"><Button color="inherit">
            <span className='hidden md:flex'>Profile</span> <span className='md:hidden'><Person /></span>
            </Button></Link>}
          </div>
          <div className="flex space-x-2">
            { !userId ? (<Link href='/sign-in'>
                <Button color="inherit">
                
                  <span className='hidden md:flex'>  sign in</span> <span><Login /></span>
                </Button>
            </Link>) :
            (
                <Button color="inherit" onClick={handleLogout} className='flex items-center gap-1'>
                  <span className='hidden md:flex'>sign out</span> <span><Logout/></span>
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