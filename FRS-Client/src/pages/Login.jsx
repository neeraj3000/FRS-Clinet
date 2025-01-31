import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Validation Schema for Formik
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role selection is required')
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const login = async (email, password, role) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });


      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token.access_token);
      localStorage.setItem('role', role);
      return { email, role, token: data.token.access_token };
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: ''
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const userData = await login(values.email, values.password, values.role);
        switch (userData.role) {
          case 'student':
            navigate('/student');
            break;
          case 'faculty':
            navigate('/faculty');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            alert('Invalid role');
        }
      } catch (error) {
        setError('Login failed. Please check your credentials.');
      }
    }
  });

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 400, height: "fit-content", mx: 'auto', mt: 4, p: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
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
