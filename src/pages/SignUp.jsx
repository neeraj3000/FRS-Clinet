import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  otp: yup.string().when('otpSent', {
    is: true,
    then: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits')
  })
});

const Signup = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      otp: '',
      otpSent: false
    },
    validationSchema,
    onSubmit: (values) => {
      if (!otpVerified) {
        alert('Please verify OTP first');
        return;
      }
      console.log(values);
      // Handle signup logic here
    }
  });

  const handleSendOtp = () => {
    if (!formik.values.email || formik.errors.email) {
      alert('Please enter a valid email');
      return;
    }
    // Handle OTP sending logic here
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Handle OTP verification logic here
    setOtpVerified(true);
  };

  return (
    <Box sx={{height:"100vh",display:"flex",alignItems:"center"}}>
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Signup</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
        />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            disabled={otpVerified}
          />
          <Button 
            variant="contained" 
            onClick={handleSendOtp}
            disabled={otpVerified}
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
        </Box>

        {otpSent && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <TextField
              fullWidth
              margin="normal"
              name="otp"
              label="Enter OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.otp)}
              helperText={formik.errors.otp}
              disabled={otpVerified}
            />
            <Button 
              variant="contained" 
              onClick={handleVerifyOtp}
              disabled={otpVerified}
              sx={{ mt: 2 }}
            >
              Verify
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleSendOtp}
              disabled={otpVerified}
              sx={{ mt: 2 }}
            >
              Resend
            </Button>
          </Box>
        )}

        <TextField
          fullWidth
          margin="normal"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />

        <TextField
          fullWidth
          margin="normal"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.confirmPassword)}
          helperText={formik.errors.confirmPassword}
        />

        <Button 
          fullWidth 
          variant="contained" 
          type="submit"
          disabled={!otpVerified}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
    </Box>

  );
};

export default Signup;