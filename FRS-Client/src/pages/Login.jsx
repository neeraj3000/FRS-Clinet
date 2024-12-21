import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Link,
  FormHelperText,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa';
import LoginBackgroundLarge from '../components/Assets/LoginBackgroundLarge.jpg';
import LoginBackgroundSmall from '../components/Assets/LoginBackgroundSmall.png';
const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // State for error messages
  const [errors, setErrors] = useState({
    userID: '',
    password: '',
    role: '',
  });

  // Function to toggle the password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle the login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate fields
    let newErrors = { userID: '', password: '', role: '' };

    if (!userID) {
      newErrors.userID = 'userID is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (!role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with login (here you can add your actual login logic)
    if (!newErrors.userID && !newErrors.password && !newErrors.role) {
      // alert('Login successful');
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/admin'); 
      }, 500); 
      // navigate('/admin'); 
      // Add your login logic here
    }
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${LoginBackgroundLarge})`,  // Default background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingRight: '5%',
        paddingLeft: '0%',
        '@media (max-width: 1042px)': {
          backgroundImage: `url(${LoginBackgroundSmall})`,
        },
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' },
          background: 'rgba(80, 80, 80, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          backdropFilter: 'blur(30px)',
          padding: { xs: 2, sm: 4 },
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          FRS Login
        </Typography>

        {/* Role Selection */}
        <FormControl component="fieldset" sx={{ mb: 2, textAlign: 'left' }}>
          <FormLabel
            sx={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: '18px',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
              '&.Mui-focused': {
              color: '#000', },
            }}
          >
            Select Your Role:
          </FormLabel>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel
              value="Student"
              control={<Radio sx={{ color: 'salmon' }} />}
              label="Student"
              sx={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
                marginRight: 1, 
                '@media (max-width: 365px)': {
                  marginRight: 0, // Further reduce spacing on small screens
                },}}
            />
            <FormControlLabel
              value="Faculty"
              control={<Radio sx={{ color: 'salmon' }} />}
              label="Faculty"
              sx={{
                color: '#fff', 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 1)', 
                marginRight: 1, 
                '@media (max-width: 365px)': {
                  marginRight: 0.5, // Further reduce spacing on small screens
                },}}
            />
            <FormControlLabel
              value="Admin"
              control={<Radio sx={{ color: 'salmon' }} />}
              label="Admin"
              sx={{
                color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
                marginRight: 0, // No margin on the last item
                '@media (max-width: 365px)': {
                  marginRight: 0,
                },
               }}
            />
          </RadioGroup>
          {errors.role && <FormHelperText sx={{ color: 'red' }}>{errors.role}</FormHelperText>}
        </FormControl>

        {/* userID Field */}
        <Box sx={{ position: 'relative', mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter userID"
            variant="outlined"
            value={userID}
            onChange={(e) => setuserID(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: 'rgba(255, 182, 193, 0.8)',
                borderRadius: '40px',
                paddingLeft: 2,
                color: '#fff',
              },
            }}
            sx={{
              input: {
                color: '#000',
                '&::placeholder': {
                  color: '#000', // Placeholder styling
                },
                '@media (max-width: 375px)': {
                  width: '65%', // For small screens
                },
                '@media (min-width: 375px) and (max-width: 450px)': {
                  width: '70%', // For medium screens
                },
                '@media (min-width: 450px) and (max-width: 600px)': {
                  width: '75%', // For medium screens
                },
                '@media (min-width: 601px) and (max-width: 900px)': {
                  width: '75%', // For medium screens
                },
                '@media (min-width: 901px)': {
                  width: '75%', // For large screens
                },
              },
            }}
          />
          <FaUser
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: '#000',
            }}
          />
          {errors.userID && <FormHelperText sx={{ color: 'red' }}>{errors.userID}</FormHelperText>}
        </Box>

        {/* Password Field */}
        <Box sx={{ position: 'relative', mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter Password"
            type={showPassword ? 'text' : 'password'} // This ensures password is hidden by default
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: 'rgba(255, 182, 193, 0.8)',
                borderRadius: '40px',
                paddingLeft: 2,
                color: '#000',
              },
            }}
            sx={{
              input: {
                color: '#000',
                '&::placeholder': {
                  color: '#555', // Placeholder styling
                },
                '@media (max-width: 375px)': {
                  width: '65%', // For small screens
                },
                '@media (min-width: 375px) and (max-width: 450px)': {
                  width: '70%', // For medium screens
                },
                '@media (min-width: 450px) and (max-width: 600px)': {
                  width: '75%', // For medium screens
                },
                '@media (min-width: 601px) and (max-width: 900px)': {
                  width: '75%', // For medium screens
                },
                '@media (min-width: 901px)': {
                  width: '75%', // For large screens
                },
              },
            }}
          />

          {/* Eye Icon for toggling password visibility */}
          {showPassword ? (
            <FaEyeSlash
              onClick={handleTogglePassword}
              style={{
                position: 'absolute',
                right: 50,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                color: '#000',
                cursor: 'pointer',
              }}
            />
          ) : (
            <FaEye
              onClick={handleTogglePassword}
              style={{
                position: 'absolute',
                right: 50,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                color: '#000',
                cursor: 'pointer',
              }}
            />
          )}
          <FaLock
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: '#000',
            }}
          />
          {errors.password && <FormHelperText sx={{ color: 'red' }}>{errors.password}</FormHelperText>}
        </Box>

        {/* Remember Me and Forgot Password */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <FormControlLabel
          control={<Checkbox sx={{ color: '#fff' }} />}
          label="Remember me"
          sx={{
            color: '#fff',
            '& .MuiFormControlLabel-label': {
              lineHeight: 1, // Default line height for the label on all screen sizes
            },
            marginLeft: 0, // Ensure no unnecessary margin
          }}
          />
          <Link href="#" underline="hover" sx={{ color: '#fff', fontSize: '14px' }}>
            Forgot password?
          </Link>
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '40px',
            fontWeight: 700,
            paddingY: 1,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#f2f2f2' },
          }}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <ToastContainer />

        {/* Register Link */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          Don’t have an account?{' '}
          <Link href="#" underline="hover" sx={{ color: '#fff', fontWeight: 600 }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
};

export default LoginForm;
