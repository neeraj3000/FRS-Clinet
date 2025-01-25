import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role selection is required')
});

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: ''
    },
    validationSchema,
    validateOnBlur: true, // Validate on blur (when the field loses focus)
    onSubmit: (values) => {
      console.log(values);
      // Handle login logic here
      // After successful login, redirect based on selected role
      if (values.role === 'student') {
        navigate('/student'); // Redirect to /student
      } else if (values.role === 'faculty') {
        navigate('/faculty'); // Redirect to /faculty
      } else if (values.role === 'admin') {
        navigate('/admin'); // Redirect to /admin
      }
    }
  });

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 400, height: "fit-content", mx: 'auto', mt: 4, p: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <RadioGroup
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
            <FormControlLabel value="student" control={<Radio />} label="Student" />
          </RadioGroup>
          {formik.touched.role && formik.errors.role && <Typography color="error">{formik.errors.role}</Typography>}

          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            name="password"
            type="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          {/* Forgot Password and Sign-up Links */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>
              <Link component={RouterLink} to="/signup">Sign up here</Link>
            </Typography>
            <Typography>
              <Link component={RouterLink} to="/forgot">Forgot password?</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
