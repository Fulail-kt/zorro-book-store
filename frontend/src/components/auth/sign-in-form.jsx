'use client'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { login } from '@/service/axios/end-points';
import { useEffect } from 'react';

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useRouter()
  const onSubmit = async(data) => {
    console.log(data);
    const response=await login(data)
    if(response?.success){
      localStorage.setItem('zr_token',response?.token)
      if(response?.role=='admin'){
        navigate.replace('/books')
      }else{
        navigate.replace('/')
      }
     
    }

  };

  useEffect(()=>{
    const token=localStorage.getItem('zr_token')
    if(token){
      navigate.replace('/')
    }
  },[])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 relative p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="absolute top-0 -z-10 bg-orange-500 inset-0 after:content-[''] after:absolute after:inset-0 after:bg-black after:transform after:origin-top-left after:rotate-45 after:scale-y-150"></div>

        <Typography variant="h4" className="text-center mb-4">
          Login
        </Typography>
        
        <TextField
          id='outlined-basic'
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          className='custom-textfield'
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          className='custom-textfield'
          {...register("password", { 
            required: "Password is required"
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button 
          type="submit" 
          variant="contained" 
          style={{background:'black', color:'white'}} 
          fullWidth 
          className="mt-4 bg-white text-black"
        >
          Login
        </Button>

        <Link href='/sign-up' className='text-xs hover:text-blue-300'>Don't have an account?</Link>
        
      </Box>
    </div>
  );
}