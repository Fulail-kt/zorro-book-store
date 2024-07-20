'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { create, login } from '@/service/axios/end-points';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useRouter()

  useEffect(()=>{
    const token=localStorage.getItem('zr_token')
    if(token){
      navigate.replace('/')
    }
  },[])
  
  const onSubmit = async(data) => {
    console.log(data);
    const response= await create(data)
    if(response?.success){
      navigate.replace('/sign-in')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 relative border-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="absolute top-0 -z-10 bg-orange-500 inset-0 after:content-[''] after:absolute after:inset-0 after:bg-black after:transform after:origin-top-left after:rotate-45 after:scale-y-150"></div>

        <Typography variant="h4" className="text-center mb-4">
          Sign Up
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          className='custom-textfield'
          {...register("name", { 
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters"
            } 
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
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
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 8 characters"
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          className='custom-textfield'
          {...register("confirmPassword", { 
            required: "Please confirm your password",
            validate: value => value === password || "The passwords do not match"
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" style={{backgroundColor:'black',color:'white'}} fullWidth className="mt-4 bg-white text-black">
          Sign Up
        </Button>

        <Link href='/sign-in' className='text-xs hover:text-blue-300'>Already have an account?</Link>
      </Box>
    </div>
  );
}