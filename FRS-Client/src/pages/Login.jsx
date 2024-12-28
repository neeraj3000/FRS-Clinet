import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role selection is required')
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle login logic here
    }
  });

  return (
    <Box sx={{height:"100vh",display:"flex",alignItems:"center"}}>

    <Box sx={{ maxWidth: 400,height:"fit-content", mx: 'auto', mt: 4, p: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={formik.handleSubmit}>
        <RadioGroup
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          sx={{display:"flex",flexDirection:"row"}}
        >
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
          <FormControlLabel value="student" control={<Radio />} label="Student" />
        </RadioGroup>
        {formik.errors.role && <Typography color="error">{formik.errors.role}</Typography>}

        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />

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

        <Button 
          fullWidth 
          variant="contained" 
          type="submit" 
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        {formik.values.role === 'admin' && (
          <Typography sx={{ mt: 2 }}>
            New Admin? <Link href="/signup">Sign up here</Link>
          </Typography>
        )}
      </form>
    </Box>
    </Box>
  );
};

export default Login;